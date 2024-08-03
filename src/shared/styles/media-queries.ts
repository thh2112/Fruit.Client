type Breakpoints = {
  mobileFirst: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  desktopFirst: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
};

type BreakpointType = 'mobileFirst' | 'desktopFirst';

export const breakpoints: Breakpoints = {
  mobileFirst: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  },
  desktopFirst: {
    sm: 575.98,
    md: 767.98,
    lg: 991.98,
    xl: 1199.98,
    xxl: 1599.98,
  },
};

export const media = (n: keyof Breakpoints['mobileFirst']) => {
  const viewport = breakpoints.mobileFirst[n];
  return `@media (min-width: ${viewport}px)`;
};

export const mediaDesktopFirst = (n: keyof Breakpoints['desktopFirst']) => {
  const viewport = breakpoints.desktopFirst[n];
  return `@media (max-width: ${viewport}px)`;
};

export const mediaCustom = (viewport: number, type?: BreakpointType) => {
  switch (type) {
    case 'desktopFirst':
      return `@media (max-width: ${viewport}px)`;
    default:
      return `@media (min-width: ${viewport}px)`;
  }
};
