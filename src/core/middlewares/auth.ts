import { authSetting, routeSetting } from '@/routes/navigate';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';
import { NextRequestWithAuth } from 'next-auth/middleware';

const protectedRoutes = [routeSetting.project()];
const authPaths = [authSetting.login(), authSetting.register()];
const protectedPathRegex = new RegExp(`^(${protectedRoutes.join('|')})(/.*)?$`);
const authPathRegex = new RegExp(`^(${authPaths.join('|')})(/.*)?$`);
export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async function (request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next();
    const pathName = request.nextUrl.pathname;

    if (pathName.startsWith('/api')) {
      return middleware(request, event, response);
    }

    const token = await getToken({ req: request });
    (request as NextRequestWithAuth).nextauth = { token };
    const matchProtectedPaths = protectedPathRegex.test(pathName);
    const mathAuthPaths = authPathRegex.test(pathName);

    if (!token && matchProtectedPaths) {
      const redirectUrl = `${request.nextUrl.origin}${authSetting.login()}?redirectUrl=${encodeURIComponent(pathName)}`;
      return NextResponse.redirect(redirectUrl);
    }

    if (token && mathAuthPaths) {
      const redirectUrl = `${request.nextUrl.origin}${routeSetting.project()}`;
      return NextResponse.redirect(redirectUrl);
    }

    return middleware(request, event, response);
  };
}
