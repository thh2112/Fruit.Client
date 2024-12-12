import { DEFAULT_LANGUAGE } from '@/constanst/consts';
import { BASE_API_URL } from '@/constanst/consts/env-config';
import { handleResponseError, languageStorage } from '@/shared/utils';
import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import _get from 'lodash/get';

const clientHttp: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

clientHttp.interceptors.request.use(
  async (config) => {
    if (config.headers && config.headers.Authorization) {
      return config;
    }

    const session = await getSession();
    if (session) {
      const accessToken = _get(session, 'user.accessToken', '');
      const languageFromLocal = languageStorage.getItem();
      const language = languageFromLocal ?? DEFAULT_LANGUAGE;
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['Accept-Language'] = language;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

clientHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const response = handleResponseError(error);
    return Promise.reject(response);
  },
);

export default clientHttp;
