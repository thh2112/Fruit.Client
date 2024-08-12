function addSlackToRoute(route: string) {
  return '/' + route;
}

export const PRIVATE_ROUTER = {
  HOME: '/',
  NOTIFICATION: '/notification',
  PROJECT: 'project',
};

export const PUBLIC_ROUTER = {
  LOGIN: '/login',
  REGISTER: '/register',
};

export const routeSetting = {
  project: () => {
    return addSlackToRoute(PRIVATE_ROUTER.PROJECT);
  },
};
