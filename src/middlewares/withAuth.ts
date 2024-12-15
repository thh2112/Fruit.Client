import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { CustomMiddleware } from './chain';
import { languages } from '@/constanst/consts';
import { adminSetting, authSetting } from '@/routes';

const protectedPaths = [adminSetting.role(), authSetting.myProfile()];

const protectedPathRegex = new RegExp(`^(/(${languages.join('|')}))?(${protectedPaths.join('|')})(/.*)?$`);

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const pathName = request.nextUrl.pathname;

    // ignore when it's RESTFUL API
    if (pathName.startsWith('/api')) {
      return middleware(request, event, response);
    }

    const token = await getToken({ req: request });
    const matchProtectedPaths = protectedPathRegex.test(pathName);

    if (!token && matchProtectedPaths) {
      const redirectUrl = `${request.nextUrl.origin}${authSetting.login()}?redirectUrl=${encodeURIComponent(pathName)}`;
      return NextResponse.redirect(redirectUrl);
    }

    return middleware(request, event, response);
  };
}
