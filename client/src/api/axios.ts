import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/types';
import { useAuthStore } from '@/store/authStore';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const envApiBaseUrl = import.meta.env.VITE_API_URL;

const resolveApiBaseUrl = () => {
  if (!import.meta.env.PROD) {
    return envApiBaseUrl ?? '/api';
  }

  if (envApiBaseUrl && /^https?:\/\//i.test(envApiBaseUrl)) {
    return envApiBaseUrl;
  }

  return 'https://jobtrackr-api-8ei7.onrender.com/api';
};

export const apiBaseUrl = resolveApiBaseUrl();

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true
});

const refreshClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const requestUrl = originalRequest?.url ?? '';
    const isExcludedAuthRequest =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/register') ||
      requestUrl.includes('/auth/refresh') ||
      requestUrl.includes('/auth/logout');

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isExcludedAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshClient.post<ApiResponse<{ accessToken: string }>>(
          '/auth/refresh'
        );

        useAuthStore.getState().setAccessToken(data.data.accessToken);

        if (typeof originalRequest.headers?.set === 'function') {
          originalRequest.headers.set('Authorization', `Bearer ${data.data.accessToken}`);
        } else {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${data.data.accessToken}`
          };
        }

        return axiosInstance(originalRequest);
      } catch {
        useAuthStore.getState().clearAuth();

        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { refreshClient };

