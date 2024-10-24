import { Languages } from './enums';
import { ApiVersion } from './types/api-response';

export const apiVersion: ApiVersion = {
  version: '1',
};

export const DEFAULT_LANGUAGE = 'en';
export const HEADER_HEIGHT = 60;
export const SIDEBAR_WIDTH = 240;
export const DRAWER_WIDTH = 320;

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;

// DATE FORMAT
export const DATE_SHOW_FORMAT = 'MMM DD, YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';

export const localStorageKey = {
  user: 'user-data',
};

export const LOGO = '/assets/images/logo.png';
export const REGISTER_BANNER = '/assets/images/auth/sign-in.svg';

export const defaultLanguage = 'en';
export const languages = [defaultLanguage, Languages.VI];
