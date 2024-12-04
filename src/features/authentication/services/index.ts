import publicHttp from '@/libs/axios/public-http';
import { ICredentialPayload, SignUpFormValue } from '../types/auth';

export const authService = {
  signUp: async (url: string, { arg: payload }: { arg: SignUpFormValue }) => {
    const { data } = await publicHttp.post(url, payload);
    return data;
  },
  login: async (url: string, payload: ICredentialPayload) => {
    const { data } = await publicHttp.post(url, payload);
    return data;
  },
};
