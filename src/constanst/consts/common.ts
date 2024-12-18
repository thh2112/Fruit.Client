export const LOGO_IMAGE = '/assets/logo.png';
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

export const apiVersion = 1;

export const localStorageKey = {
  userInfo: 'userInfo',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

export enum GenderType {
  Male,
  Female,
  Other,
}

export const cookieKey = {
  accessToken: 'access_token',
};
