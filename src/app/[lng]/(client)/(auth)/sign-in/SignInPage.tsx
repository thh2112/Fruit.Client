'use client';

import { localStorageKey } from '@/constanst/consts';
import { LogInForm } from '@/features/authentication/components/LogInForm';
import { SignInFormValue } from '@/features/authentication/types/auth';
import { authSetting, clientSetting } from '@/routes';
import { encrypted } from '@/shared/utils';
import styled from '@emotion/styled';
import { Divider, Flex, Typography } from 'antd';
import _get from 'lodash/get';
import _toString from 'lodash/toString';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

const { Title } = Typography;

const SignInPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const callbackUrl = useMemo(() => {
    return searchParams.get('redirectUrl') || clientSetting.homePage();
  }, [searchParams]);

  const initialValue: SignInFormValue = {
    email: '',
    password: '',
    rememberMe: true,
  };
  const handleRememberMe = (formValue: SignInFormValue) => {
    const encodeLocalKey = encrypted(localStorageKey.userInfo);
    const encodeData = encrypted(JSON.stringify(formValue));
    localStorage.setItem(encodeLocalKey, encodeData);
  };

  const unRememberMe = () => {
    const encodeLocalKey = encrypted(localStorageKey.userInfo);
    localStorage.removeItem(encodeLocalKey);
  };

  const handleSubmit = async (formValue: SignInFormValue) => {
    setLoading(true);
    try {
      const { email, password } = formValue;
      const payload: Record<'username' | 'password', string> = {
        username: email,
        password: encrypted(password),
      };
      const response = await signIn('credentials', {
        ...payload,
        redirect: false,
        callbackUrl: callbackUrl,
      });

      if (response?.error) {
        setErrorMessage(response.error);
        return;
      } else {
        setErrorMessage(null);
      }

      if (formValue.rememberMe) {
        handleRememberMe(formValue);
      } else {
        unRememberMe();
      }

      const redirectUrl = _toString(_get(response, 'url', callbackUrl));
      router.push(redirectUrl);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInContainer justify="center" align="center" style={{ padding: 24, minHeight: 450 }} vertical>
      <Title level={3} style={{ marginBottom: 36 }}>
        Log In
      </Title>
      <LogInForm onSubmit={handleSubmit} loading={loading} initialValue={initialValue} errorMessage={errorMessage} />
      <Divider>
        <Typography.Text color="secondary">or</Typography.Text>
      </Divider>
      <Typography.Text>
        Don't have an account yet? <Link href={authSetting.register()}>Register</Link> here
      </Typography.Text>
    </SignInContainer>
  );
};

const SignInContainer = styled(Flex)(() => ({
  minHeight: 400,
  padding: 24,
  maxWidth: 450,
  margin: 'auto',
}));

export default SignInPage;
