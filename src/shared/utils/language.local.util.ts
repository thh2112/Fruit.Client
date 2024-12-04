import { LanguageType } from '@/constanst/consts';

const langKey = 'lang';

const setItem = (language: LanguageType) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(langKey, language);
};

const getItem = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(langKey);
};

export const languageStorage = {
  setItem,
  getItem,
};
