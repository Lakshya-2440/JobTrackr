import { Request, Response } from 'express';
import { JobStatus } from '@prisma/client';
import { JobFiltersQuery } from '../schemas/job.schema';
import { jobService } from '../services/job.service';
import { ApiError } from '../utils/ApiError';

const getUserId = (req: Request) => {
  if (!req.user?.id) {
    throw new ApiError(401, 'Unauthorized');
  }

  return req.user.id;
};

const getJobId = (req: Request) => {
  const jobId = req.params.id;

  if (!jobId) {
    throw new ApiError(400, 'Job id is required');
  }

  return Array.isArray(jobId) ? jobId[0] : jobId;
};

export const jobController = {
  async getAll(req: Request, res: Response) {
    const data = await jobService.getAll(getUserId(req), req.query as unknown as JobFiltersQuery);

    res.status(200).json({
      success: true,
      data
    });
  },

  async getById(req: Request, res: Response) {
    const data = await jobService.getById(getUserId(req), getJobId(req));

    res.status(200).json({
      success: true,
      data
    });
  },

  async create(req: Request, res: Response) {
    const data = await jobService.create(getUserId(req), req.body);

    res.status(201).json({
      success: true,
      data
    });
  },

  async update(req: Request, res: Response) {
    const data = await jobService.update(getUserId(req), getJobId(req), req.body);

    res.status(200).json({
      success: true,
      data
    });
  },

  async updateStatus(req: Request, res: Response) {
    const data = await jobService.updateStatus(
      getUserId(req),
      getJobId(req),
      req.body.status as JobStatus
    );

    res.status(200).json({
      success: true,
      data
    });
  },

  async delete(req: Request, res: Response) {
    const data = await jobService.delete(getUserId(req), getJobId(req));

    res.status(200).json({
      success: true,
      data
    });
  },

  async getAnalytics(req: Request, res: Response) {
    const data = await jobService.getAnalytics(getUserId(req));

    res.status(200).json({
      success: true,
      data
    });
  }
};
