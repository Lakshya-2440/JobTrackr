import axiosInstance from '@/api/axios';
import { ApiResponse, AssistantResponse } from '@/types';

export const askAssistant = async (question: string) => {
  const response = await axiosInstance.post<ApiResponse<AssistantResponse>>('/assistant/query', {
    question
  });

  return response.data.data;
};
