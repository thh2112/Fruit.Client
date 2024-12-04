import { LanguageType, languages } from '@/constanst/consts';
import { languageStorage } from '../utils';

export function languageSwitcher(value: LanguageType) {
  const notSupportLanguage = !languages.some((loc) => window.location.pathname.startsWith(`/${loc}`));
  if (notSupportLanguage || typeof window === 'undefined') {
    return;
  }

  languageStorage.setItem(value);
  const split = window.location.pathname.split('/');
  split.splice(1, 1, value);
  const searchParams = window.location.search;

  window.location.replace(`${split.join('/')}${searchParams}`);
}
