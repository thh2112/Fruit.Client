import { GenderEnum } from '@/shared/enums';

export interface IAuth {
  accessToken: string;
}

export interface IAuthPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends IAuthPayload {
  fullName: string;
  gender: GenderEnum;
  phone: string;
}
