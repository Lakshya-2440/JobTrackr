import axiosInstance from '@/api/axios';
import {
  AnalyticsSummary,
  ApiResponse,
  IJob,
  JobFilters,
  JobPayload,
  JobStatus,
  PaginatedResponse
} from '@/types';

export const fetchJobs = async (params: JobFilters) => {
  const response = await axiosInstance.get<ApiResponse<PaginatedResponse<IJob>>>('/jobs', {
    params
  });

  return response.data.data;
};

export const fetchJobById = async (id: string) => {
  const response = await axiosInstance.get<ApiResponse<IJob>>(`/jobs/${id}`);
  return response.data.data;
};

export const createJob = async (data: JobPayload) => {
  const response = await axiosInstance.post<ApiResponse<IJob>>('/jobs', data);
  return response.data.data;
};

export const updateJob = async (id: string, data: JobPayload) => {
  const response = await axiosInstance.patch<ApiResponse<IJob>>(`/jobs/${id}`, data);
  return response.data.data;
};

export const updateJobStatus = async (id: string, status: JobStatus) => {
  const response = await axiosInstance.patch<ApiResponse<IJob>>(`/jobs/${id}/status`, { status });
  return response.data.data;
};

export const deleteJob = async (id: string) => {
  const response = await axiosInstance.delete<ApiResponse<{ id: string }>>(`/jobs/${id}`);
  return response.data.data;
};

export const fetchAnalytics = async () => {
  const response = await axiosInstance.get<ApiResponse<AnalyticsSummary>>('/jobs/analytics/summary');
  return response.data.data;
};

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<ApiResponse<{ url: string }>>('/upload/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data.data;
};

