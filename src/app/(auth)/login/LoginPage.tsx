'use client';

import LoginForm, { FormField } from '@/features/authentication/components/LoginForm';
import withTheme, { IThemeAntd } from '@/libs/antd/theme';
import { authSetting, routeSetting } from '@/routes/navigate';
import { localStorageKey } from '@/shared/constant';
import { encrypted } from '@/shared/helpers/security';
import { media } from '@/shared/styles/media-queries';
import { handleResponseErrors } from '@/shared/utils';
import styled from '@emotion/styled';
import { Col, Flex, Row, Typography, theme } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import _toString from 'lodash/toString';
import _get from 'lodash/get';
import Link from 'next/link';

const { Title, Text } = Typography;

const LoginPage = () => {
  const {
    token: { padding, marginLG },
  } = theme.useToken();

  const router = useRouter();

  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(true);

  const callbackUrl = searchParams.get('redirectUrl') || routeSetting.project();

  const initialValues: FormField = {
    password: '',
    email: '',
    remember: remember,
  };

  const handleRememberMe = (formValue: FormField) => {
    const localKey = localStorageKey.user;
    const encodeLocalKey = encrypted(localKey);
    const encodeData = encrypted(JSON.stringify(formValue));
    localStorage.setItem(encodeLocalKey, encodeData);
  };

  const unRememberMe = () => {
    const localKey = localStorageKey.user;
    const encodeLocalKey = encrypted(localKey);
    localStorage.removeItem(encodeLocalKey);
  };

  const handleLogin = async (formValue: FormField) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const { email, password } = formValue;
      const payload: Record<'username' | 'password', string> = {
        username: email,
        password,
      };

      const response = await signIn('credentials', { ...payload, redirect: false, callbackUrl });

      if (response?.error) {
        setErrorMessage(response.error);
        setLoading(false);
        return;
      }

      if (formValue.remember) {
        handleRememberMe(formValue);
      } else {
        unRememberMe();
      }
      router.push(_toString(_get(response, 'url', '')));
    } catch (error) {
      const { errorMessage } = handleResponseErrors(error);
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return withTheme(
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: padding }}>
      <Column xs={24} md={12} xl={6}>
        <TitleAuthentication level={4} style={{ marginBottom: marginLG }}>
          Log In
        </TitleAuthentication>
        <LoginForm
          loading={loading}
          initialValues={initialValues}
          errorMessage={errorMessage}
          setRemember={() => setRemember(remember)}
          onSubmit={handleLogin}
        />
        <Flex justify="center" align="center" gap="small">
          <Text strong type="secondary">
            Already have an account?
          </Text>
          <Link href={authSetting.register()}>
            <Text type="warning" strong>
              Register
            </Text>
          </Link>
        </Flex>
      </Column>
    </Row>,
  );
};

export const TitleAuthentication = styled(Title)((props) => ({
  color: (props.theme as IThemeAntd).antdToken?.colorTextDescription,
  textAlign: 'center',
}));

const Column = styled(Col)(() => ({
  minWidth: 'unset',
  [media('md')]: {
    minWidth: 500,
    maxWidth: 500,
  },
}));

export default LoginPage;
