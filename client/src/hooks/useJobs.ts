import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createJob,
  deleteJob,
  fetchAnalytics,
  fetchJobById,
  fetchJobs,
  updateJob,
  updateJobStatus
} from '@/api/jobs.api';
import { getErrorMessage } from '@/utils/errors';
import { IJob, JobFilters, JobPayload, JobStatus, PaginatedResponse } from '@/types';

export const useJobs = (filters: JobFilters) =>
  useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => fetchJobs(filters),
    placeholderData: keepPreviousData
  });

export const useJob = (id?: string) =>
  useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJobById(id as string),
    enabled: Boolean(id)
  });

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JobPayload) => createJob(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['jobs'] }),
        queryClient.invalidateQueries({ queryKey: ['analytics'] })
      ]);
      toast.success('Job added!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to add job'));
    }
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: JobPayload }) => updateJob(id, payload),
    onSuccess: async (job) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['jobs'] }),
        queryClient.invalidateQueries({ queryKey: ['job', job.id] }),
        queryClient.invalidateQueries({ queryKey: ['analytics'] })
      ]);
      toast.success('Job updated!');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to update job'));
    }
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobStatus }) => updateJobStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['jobs'] });

      const previousJobs = queryClient.getQueriesData<PaginatedResponse<IJob>>({
        queryKey: ['jobs']
      });
      const previousJobDetails = queryClient.getQueriesData<IJob>({
        queryKey: ['job']
      });

      previousJobs.forEach(([queryKey, data]) => {
        if (!data) {
          return;
        }

        queryClient.setQueryData<PaginatedResponse<IJob>>(queryKey, {
          ...data,
          jobs: data.jobs.map((job) => (job.id === id ? { ...job, status } : job))
        });
      });

      previousJobDetails.forEach(([queryKey, data]) => {
        if (!data) {
          return;
        }

        queryClient.setQueryData<IJob>(queryKey, data.id === id ? { ...data, status } : data);
      });

      return { previousJobs, previousJobDetails };
    },
    onError: (error, _variables, context) => {
      context?.previousJobs.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      context?.previousJobDetails.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      toast.error(getErrorMessage(error, 'Failed to update job status'));
    },
    onSettled: async (_data, _error, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['jobs'] }),
        queryClient.invalidateQueries({ queryKey: ['job', variables.id] }),
        queryClient.invalidateQueries({ queryKey: ['analytics'] })
      ]);
    }
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['jobs'] }),
        queryClient.invalidateQueries({ queryKey: ['job', id] }),
        queryClient.invalidateQueries({ queryKey: ['analytics'] })
      ]);
      toast.success('Job deleted');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Failed to delete job'));
    }
  });
};

export const useAnalytics = () =>
  useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics
  });

