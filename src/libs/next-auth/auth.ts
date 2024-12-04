import { apiVersion } from '@/constanst/consts';
import { NEXT_AUTH_SECRET } from '@/constanst/consts/env-config';
import { authService } from '@/features/authentication/services';
import { ICredentialPayload } from '@/features/authentication/types/auth';
import { authSetting } from '@/routes/navigate';
import { decrypted } from '@/shared/utils';
import _get from 'lodash/get';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type CredentialType = Record<'username' | 'password', string> | undefined;

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Please provide process.env.NEXTAUTH_SECRET environment variable');
}

const authorize = async (credentials: CredentialType) => {
  try {
    if (!credentials?.username || !credentials?.password) {
      throw new Error('Please enter an username and password');
    }

    const payload: ICredentialPayload = {
      email: credentials.username,
      password: decrypted(credentials.password),
    };

    console.log('----------TIME TO AUTHENTICATE------------');
    const urlPath = `api/v${apiVersion}/auth/login`;
    const { data } = await authService.login(urlPath, payload);
    const id = _get(data, 'user.id', '');
    const email = _get(data, 'user.email', '');
    const name = _get(data, 'user.fullName', '');
    const refreshToken = _get(data, 'refreshToken');
    const accessToken = _get(data, 'accessToken', '');

    console.log('--------------------------------', data);
    return data ? { id, email, name, accessToken, refreshToken } : null;
  } catch (error) {
    throw new Error((error as any).errorMessage);
  }
};

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: NEXT_AUTH_SECRET,
  pages: {
    signIn: authSetting.login(),
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
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
    // async redirect({ url, baseUrl }) {
    //   console.log('redirecting', url, baseUrl);
    //   return '';
    // },
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
