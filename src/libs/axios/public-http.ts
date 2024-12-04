import { DEFAULT_LANGUAGE } from '@/constanst/consts';
import { BASE_API_URL } from '@/constanst/consts/env-config';
import { handleResponseError, languageStorage } from '@/shared/utils';
import axios, { AxiosInstance } from 'axios';

const publicHttp: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

publicHttp.interceptors.request.use(
  (config) => {
    const languageFromLocal = languageStorage.getItem();
    const language = languageFromLocal ?? DEFAULT_LANGUAGE;
    config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

publicHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const response = handleResponseError(error);
    console.log('check lỗi', response);
    return Promise.reject(response);
  },
);

export default publicHttp;
