import { GenderType } from '@/constanst/consts';

export enum SignInFormLabel {
  Email = 'email',
  Password = 'password',
  RememberMe = 'rememberMe',
}

export enum SignUpFormLabel {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  FirstName = 'firstName',
  LastName = 'lastName',
  PhoneNumber = 'phoneNumber',
  Gender = 'gender',
}

export enum AccountInformationLabel {
  FirstName = 'firstName',
  LastName = 'lastName',
  FullName = 'fullName',
  Email = 'email',
  PhoneNumber = 'phoneNumber',
  Gender = 'gender',
}
export interface SignUpFormValue {
  [SignUpFormLabel.Email]: string;
  [SignUpFormLabel.Password]: string;
  [SignUpFormLabel.ConfirmPassword]: string;
  [SignUpFormLabel.FirstName]: string;
  [SignUpFormLabel.LastName]: string;
  [SignUpFormLabel.PhoneNumber]: string;
}

export interface SignInFormValue {
  [SignInFormLabel.Email]: string;
  [SignInFormLabel.Password]: string;
  [SignInFormLabel.RememberMe]: boolean;
}

export interface ICredentialPayload {
  email: string;
  password: string;
}

export interface AccountInformationFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
}

export interface Role {
  id: string;
  name: string;
  createdAt: string;
}
export interface AccountInformation {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: GenderType | 'N/A';
  role: Role | null;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
