import { authSetting, routeSetting } from '@/routes/navigate';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';

const protectedRoutes = [routeSetting.project()];
const protectedPathRegex = new RegExp(`^(${protectedRoutes.join('|')})(/.*)?$`);

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async function (request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next();
    const pathName = request.nextUrl.pathname;

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
