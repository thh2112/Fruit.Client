export enum UserStatus {
  ACTIVE,
  INACTIVE,
}

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  bod: Date | string;
  gender: Gender;
  status: UserStatus;
  createdAt: string;
}
