import { ENV } from '@/environment';
import { authService } from '@/features/authentication/services';
import { IAuthPayload } from '@/features/authentication/types/auth';
import { authSetting } from '@/routes/navigate';
import { handleResponseErrors } from '@/shared/utils';
import _get from 'lodash/get';
import _toString from 'lodash/toString';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type CredentialType = Record<'username' | 'password', string> | undefined;
const MAX_AGE = 3600;

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Please provide process.env.NEXTAUTH_SECRET environment variable');
}

const authorize = async (credentials: CredentialType) => {
  try {
    if (!credentials?.username || !credentials?.password) {
      throw new Error('Please enter an username and password');
    }

    const payload: IAuthPayload = {
      email: credentials.username,
      password: credentials.password,
    };

    console.log('TIME TO AUTHENTICATE');

    const { data } = await authService.login(payload);
    const id = _get(data, 'payload.id', '');
    const email = _get(data, 'payload.email', '');
    const name = _get(data, 'payload.name', '');
    const accessToken = _get(data, 'accessToken', '');
    return data ? { id, email, name, accessToken } : null;
  } catch (error) {
    console.error('Authorize error::', error);
    const { errorMessage } = handleResponseErrors(error);
    throw new Error(errorMessage);
  }
};

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },
  secret: ENV.NEXT_AUTH_SECRET,
  pages: {
    signIn: authSetting.login(),
    signOut: authSetting.logout(),
    newUser: authSetting.register(),
    error: authSetting.error(),
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize,
    }),
  ],
  callbacks: {
    signIn: async ({ user, profile }) => {
      if (!user) {
        return false;
      }
      return true;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update' && session?.user) {
        return { ...token, ...session.user };
      }

      if (user) {
        return {
          ...user,
          ...token,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session?.user,
          ...token,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      console.log('redirecting', url, baseUrl);
      return '';
    },
  },
  cookies: {
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
};

export { authOptions };
