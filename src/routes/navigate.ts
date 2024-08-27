import { AUTH_ROUTER, PRIVATE_ROUTER } from './route-path';

function addSlackToRoute(route: string) {
  return '/' + route;
}

export const routeSetting = {
  project: () => {
    return addSlackToRoute(PRIVATE_ROUTER.PROJECT);
  },
};

export const authSetting = {
  login: () => {
    return addSlackToRoute(AUTH_ROUTER.LOGIN);
  },
  logout: () => {
    return addSlackToRoute(AUTH_ROUTER.LOGOUT);
  },
  register: () => {
    return addSlackToRoute(AUTH_ROUTER.REGISTER);
  },
};
