import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';

export function withCorsMiddleware(middleware: CustomMiddleware) {
  return function (request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    if (!pathname.startsWith('/api')) {
      return middleware(request, event, response);
    }

    const origin = request.headers.get('origin') || '';
    const allowedOrigins = process.env.ALLOW_ORIGINS_URL ? process.env.ALLOW_ORIGINS_URL.split(',') : [];

    if (allowedOrigins.includes(origin)) {
      response.headers.append('Access-Control-Allow-Origin', origin);
    }

    if (pathname.startsWith('/api')) {
      response.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      response.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      );
      return response;
    }

    return middleware(request, event, response);
  };
}
