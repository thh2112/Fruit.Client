export const endpoints = {
  signUp: (apiVersion: number) => `/api/v${apiVersion}/auth/register`,
  login: (apiVersion: number) => `/api/v${apiVersion}/auth/login`,
  myProfile: (apiVersion: number) => `/api/v${apiVersion}/auth/profile`,
  updateProfile: (apiVersion: number, userId: number) => `/api/v${apiVersion}/auth/profile/${userId}`,
  changeAvatar: (apiVersion: number, userId: number) => `/api/v${apiVersion}/auth/change-avatar/${userId}`,
  refreshToken: (apiVersion: number) => `/api/v${apiVersion}/auth/refresh`,
};
