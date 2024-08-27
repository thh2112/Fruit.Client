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
    const accessToken = _get(data, 'accessToken', '');
    const id = _toString(_get(data, 'payload.id') || '');
    const email = _toString(_get(data, 'payload.email'));
    return data ? { id, email, accessToken } : null;
  } catch (error) {
    console.error('Authorize error::', error);
    const { errorMessage } = handleResponseErrors(error);
    throw new Error(errorMessage);
  }
};

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: Number(ENV.NEXT_AUTH_TOKEN_LIFE),
  },
  secret: ENV.NEXT_AUTH_SECRET,
  pages: {
    signIn: authSetting.login(),
    signOut: authSetting.logout(),
    newUser: authSetting.register(),
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
    jwt: async ({ token, user, trigger, account }) => {
      return token;
    },
  },
};

export { authOptions };
