import { localStorageToken } from '@/shared/types/token';
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Cache-Control': 'no-cache',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorageToken.getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
