import { ENV } from '@/environment';
import { DEFAULT_LANGUAGE } from '@/shared/constant';
import axios, { AxiosInstance } from 'axios';
import _get from 'lodash/get';
import { getSession } from 'next-auth/react';

const apiClient: AxiosInstance = axios.create({
  baseURL: `${ENV.API_URL}/`,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const accessToken = _get(session, 'user.accessToken', '');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers['Accept-Language'] = DEFAULT_LANGUAGE;
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
