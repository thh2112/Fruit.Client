import { IAuth, IAuthPayload, RegisterPayload } from '@/features/authentication/types/auth';
import { apiVersion } from '@/shared/constant';
import { ApiResponse } from '@/shared/types/api-response';
import axios from 'axios';
import { endpoint } from './endpoint';
import apiClient from '@/libs/axios/http-client';
import { User } from '@/shared/types/user';

const authService = {
  login: async (payload: IAuthPayload) => {
    const response = await axios.post<ApiResponse<IAuth>>(endpoint.login(apiVersion), payload);
    return response.data;
  },
  register: async (url: string, { arg: payload }: { arg: RegisterPayload }) => {
    const response = await apiClient.post<ApiResponse<User>>(url, payload);
    return response.data;
  },
};

export { authService };
