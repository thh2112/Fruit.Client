import { ADMIN_ROUTE, AUTH_ROUTE, CLIENT_ROUTE } from './route-path';

const authSetting = {
  login: () => `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.SIGN_IN}`,
  register: () => `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.SIGN_UP}`,
  forgotPassword: () => `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.FORGOT_PASSWORD}`,
  resetPassword: () => `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.RESET_PASSWORD}`,
  verifyEmail: () => `${AUTH_ROUTE.BASE}/${AUTH_ROUTE.VERIFY_EMAIL}`,
};

const clientSetting = {
  homePage: () => `${CLIENT_ROUTE.BASE}${CLIENT_ROUTE.HOME_PAGE}`,
  new: () => `${CLIENT_ROUTE.BASE}${CLIENT_ROUTE.NEW}`,
  about: () => `${CLIENT_ROUTE.BASE}${CLIENT_ROUTE.ABOUT}`,
  contact: () => `${CLIENT_ROUTE.BASE}${CLIENT_ROUTE.CONTACT}`,
  product: () => `${CLIENT_ROUTE.BASE}${CLIENT_ROUTE.PRODUCT}`,
};

const adminSetting = {
  role: () => `${ADMIN_ROUTE.BASE}/${ADMIN_ROUTE.ROLE}`,
};

export { authSetting, clientSetting, adminSetting };
