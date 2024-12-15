import { apiVersion } from '@/constanst/consts';
import { NEXT_AUTH_SECRET, SESSION_MAX_AGE } from '@/constanst/consts/env-config';
import { authService } from '@/features/authentication/services';
import { endpoints } from '@/features/authentication/services/endpoint';
import { ICredentialPayload } from '@/features/authentication/types/auth';
import { authSetting } from '@/routes/navigate';
import { decrypted } from '@/shared/utils';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

type CredentialType = Record<'username' | 'password', string> | undefined;

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Please provide process.env.NEXTAUTH_SECRET environment variable');
}

if (!process.env.NEXT_PUBLIC_SESSION_MAX_AGE) {
  throw new Error('Please provide process.env.NEXT_PUBLIC_SESSION_MAX_AGE environment variable');
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
    const { data } = await authService.login(endpoints.login(apiVersion), payload);

    const id = _get(data, 'payload.id', '');
    const name = _get(data, 'payload.fullName', '');
    const email = _get(data, 'payload.email', '');
    const role = _get(data, 'payload.role');
    const image = _get(data, 'payload.avatar', '');
    const accessToken = _get(data, 'accessToken', '');
    const refreshToken = _get(data, 'refreshToken', '');
    return data ? { id, name, email, role, image, accessToken, refreshToken } : null;
  } catch (error) {
    throw new Error((error as any).errorMessage);
  }
};

const handleRefreshToken = async (token: string) => {
  try {
    if (!token) {
      throw new Error('Please issue refresh token');
    }

    const { data } = await authService.refreshToken(endpoints.refreshToken(apiVersion), { token });
    return data;
  } catch (error) {
    return error;
  }
};

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: Number(SESSION_MAX_AGE),
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
      let _token = token;

      if (user) {
        _token = {
          ...user,
          ..._token,
        };
      }

      const expireAccessToken = Number(jwtDecode(_get(_token, 'accessToken', '') as string).exp);
      const isAccessTokenExpired = dayjs()
        .add(5, 'minute')
        .isAfter(dayjs(expireAccessToken * 1000));

      if (isAccessTokenExpired) {
        const { accessToken } = await handleRefreshToken(_get(_token, 'refreshToken', '') as string);
        _token = {
          ..._token,
          accessToken: accessToken,
        };
      }

      if (trigger === 'update' && session?.user) {
        _token = { ..._token, ...session.user };
      }

      return _token;
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
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
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
