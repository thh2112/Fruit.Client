import { languages } from '@/constanst/consts';

export function languageSwitcher(value: any) {
  const notSupportLanguage = !languages.some((loc) => window.location.pathname.startsWith(`/${loc}`));
  if (notSupportLanguage || typeof window === 'undefined') {
    return;
  }

  const split = window.location.pathname.split('/');
  split.splice(1, 1, value);
  const searchParams = window.location.search;

  window.location.replace(`${split.join('/')}${searchParams}`);
}
