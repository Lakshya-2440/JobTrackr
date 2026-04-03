import axiosInstance, { refreshClient } from '@/api/axios';
import { ApiResponse, AuthResponse, IUser } from '@/types';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', payload);
  return response.data.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', payload);
  return response.data.data;
};

export const fetchCurrentUser = async () => {
  const response = await axiosInstance.get<ApiResponse<IUser>>('/auth/me');
  return response.data.data;
};

export const refreshAccessToken = async () => {
  const response = await refreshClient.post<ApiResponse<{ accessToken: string }>>('/auth/refresh');
  return response.data.data;
};

export const logoutUser = async () => {
  await axiosInstance.post('/auth/logout');
};

