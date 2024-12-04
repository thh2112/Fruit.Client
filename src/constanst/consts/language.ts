export const DEFAULT_LANGUAGE = 'en';

export enum Languages {
  VI = 'vi',
  EN = 'en',
}

export const languages = [DEFAULT_LANGUAGE, Languages.VI];

export const cookieLanguage = 'language';

export type LanguageType = Languages;
