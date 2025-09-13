// مسیر: packages/api-client/src/core/api.ts

import axios, { AxiosInstance, AxiosError } from 'axios';

export interface ApiConfig {
  // baseURL ما اکنون به Next.js proxy اشاره می‌کند
  baseURL: string; 
  onUnauthorized?: () => void;
}

const setupAxios = (config: ApiConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: config.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // برای ارسال کوکی‌ها به proxy
  });

  // Interceptor برای مدیریت خطاهای 401 (Unauthorized)
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        config.onUnauthorized?.(); // ریدایرکت به لاگین
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default setupAxios;