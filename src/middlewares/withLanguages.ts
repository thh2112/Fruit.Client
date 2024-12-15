import acceptLanguage from 'accept-language';
import { type NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';
import { DEFAULT_LANGUAGE, cookieLanguage, languages } from '@/constanst/consts';

acceptLanguage.languages(languages);

export function withMultiLanguage(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const pathName = request.nextUrl.pathname;

    // ignore when it's RESTFUL API
    if (pathName.startsWith('/api')) {
      return middleware(request, event, response);
    }

    let lng = DEFAULT_LANGUAGE;
    if (request.cookies.has(cookieLanguage)) {
      lng = acceptLanguage.get(request.cookies.get(cookieLanguage)?.value) || DEFAULT_LANGUAGE;
    } else if (request.headers.has('Accept-Language')) {
      lng = acceptLanguage.get(request.headers.get('Accept-Language')) || DEFAULT_LANGUAGE;
    }

    // Redirect if lng in path is not supported
    if (!languages.some((loc) => pathName.startsWith(`/${loc}`)) && !pathName.startsWith('/_next')) {
      const path = request.nextUrl.search
        ? `${request.nextUrl.pathname}/${request.nextUrl.search}`
        : request.nextUrl.pathname;
      return NextResponse.redirect(new URL(`/${lng}${path}`, request.url));
    }

    if (request.headers.has('referer')) {
      const refererUrl = new URL(request.headers.get('referer') || '');
      const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
      if (lngInReferer) {
        response.cookies.set(cookieLanguage, lngInReferer);
      }
      return response;
    }

    return middleware(request, event, response);
  };
}
