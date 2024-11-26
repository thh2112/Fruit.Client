import { chain, withAuthMiddleware, withMultiLanguage } from '@/middlewares';

export default chain([withMultiLanguage, withAuthMiddleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|manifest|favicon.png|sw.js).*)'],
};
