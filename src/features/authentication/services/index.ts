import clientHttp from '@/libs/axios/client-http';
import publicHttp from '@/libs/axios/public-http';
import { AccountInformationFormValues, ICredentialPayload, SignUpFormValue } from '../types/auth';

export const authService = {
  signUp: async (url: string, { arg: payload }: { arg: SignUpFormValue }) => {
    const { data } = await publicHttp.post(url, payload);
    return data;
  },
  login: async (url: string, payload: ICredentialPayload) => {
    const { data } = await publicHttp.post(url, payload);
    return data;
  },
  myProfile: async (url: string) => {
    const { data } = await clientHttp.get(url);
    return data;
  },
  updateMyProfile: async (url: string, payload: AccountInformationFormValues) => {
    const { data } = await clientHttp.put(url, payload);
    return data;
  },
  changeAvatar: async (url: string, files: FormData) => {
    const { data } = await clientHttp.patch(url, files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};
