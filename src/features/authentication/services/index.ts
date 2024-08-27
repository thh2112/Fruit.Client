import { IAuth, IAuthPayload } from '@/features/authentication/types/auth';
import { apiVersion } from '@/shared/constant';
import { ApiResponse } from '@/shared/types/api-response';
import axios from 'axios';
import { endpoint } from './endpoint';

const authService = {
  login: async (payload: IAuthPayload) => {
    const response = await axios.post<ApiResponse<IAuth>>(endpoint.login(apiVersion), payload);
    return response.data;
  },
};

export { authService };
