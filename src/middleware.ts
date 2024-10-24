import { withAuthMiddleware, withCorsMiddleware } from '@/core/middlewares';
import { chain } from '@/core/middlewares/chain';

export default chain([withCorsMiddleware, withAuthMiddleware]);

export const config = {
  matcher: ['/((?!api|graphql|_next/static|_next/image|assets|manifest|favicon.png|favicon.ico|sw.js).*)'],
};
