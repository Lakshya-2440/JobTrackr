import { JobStatus, Prisma, Priority } from '@prisma/client';
import { prisma } from '../config/prisma';
import {
  CreateJobInput,
  JobFiltersQuery,
  UpdateJobInput
} from '../schemas/job.schema';
import { ragService } from './rag.service';
import { ApiError } from '../utils/ApiError';

interface MonthlyApplicationsRow {
  month: string;
  count: number;
}

const jobInclude = {
  contacts: true
} as const;

export const jobService = {
  async getAll(userId: string, filters: JobFiltersQuery) {
    const {
      status,
      priority,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 20
    } = filters;

    const where: Prisma.JobWhereInput = {
      userId,
      status: status ?? undefined,
      priority: priority ?? undefined,
      OR: search
        ? [
            {
              company: {
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              position: {
                contains: search,
                mode: 'insensitive'
              }
            }
          ]
        : undefined
    };

    const skip = (page - 1) * limit;
    const orderBy = {
      [sortBy]: order
    } as Prisma.JobOrderByWithRelationInput;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: jobInclude,
        orderBy,
        skip,
        take: limit
      }),
      prisma.job.count({ where })
    ]);

    return {
      jobs,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit))
    };
  },

  async getById(userId: string, jobId: string) {
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId
      },
      include: jobInclude
    });

    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    return job;
  },

  async create(userId: string, data: CreateJobInput) {
    const job = await prisma.job.create({
      data: {
        ...data,
        userId
      },
      include: jobInclude
    });

    await ragService.upsertJobDocument(job.id);

    return job;
  },

  async update(userId: string, jobId: string, data: UpdateJobInput) {
    await this.getById(userId, jobId);

    const job = await prisma.job.update({
      where: { id: jobId },
      data,
      include: jobInclude
    });

    await ragService.upsertJobDocument(job.id);

    return job;
  },

  async updateStatus(userId: string, jobId: string, status: JobStatus) {
    await this.getById(userId, jobId);

    const job = await prisma.job.update({
      where: { id: jobId },
      data: { status },
      include: jobInclude
    });

    await ragService.upsertJobDocument(job.id);

    return job;
  },

  async delete(userId: string, jobId: string) {
    await this.getById(userId, jobId);

    await prisma.job.delete({
      where: { id: jobId }
    });

    await ragService.deleteJobDocument(jobId);

    return { id: jobId };
  },

  async getAnalytics(userId: string) {
    const [
      totalApplications,
      statusGroups,
      priorityGroups,
      applicationsByMonth
    ] = await Promise.all([
      prisma.job.count({
        where: { userId }
      }),
      prisma.job.groupBy({
        by: ['status'],
        where: { userId },
        _count: true
      }),
      prisma.job.groupBy({
        by: ['priority'],
        where: { userId },
        _count: true
      }),
      prisma.$queryRaw<MonthlyApplicationsRow[]>`
        SELECT
          TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YYYY') AS month,
          COUNT(*)::int AS count
        FROM "Job"
        WHERE "userId" = ${userId}
          AND "createdAt" >= NOW() - INTERVAL '6 months'
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY DATE_TRUNC('month', "createdAt") ASC
      `
    ]);

    const byStatus: Record<JobStatus, number> = {
      WISHLIST: 0,
      APPLIED: 0,
      INTERVIEW: 0,
      OFFER: 0,
      REJECTED: 0
    };

    const byPriority: Record<Priority, number> = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0
    };

    for (const group of statusGroups) {
      byStatus[group.status] = group._count;
    }

    for (const group of priorityGroups) {
      byPriority[group.priority] = group._count;
    }

    const responseNumerator = byStatus.INTERVIEW + byStatus.OFFER;
    const responseDenominator =
      byStatus.APPLIED + byStatus.INTERVIEW + byStatus.OFFER + byStatus.REJECTED;

    const responseRate =
      responseDenominator === 0
        ? 0
        : Number(((responseNumerator / responseDenominator) * 100).toFixed(1));

    return {
      totalApplications,
      byStatus,
      byPriority,
      applicationsByMonth,
      responseRate
    };
  }
};

