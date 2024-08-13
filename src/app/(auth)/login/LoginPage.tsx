'use client';

import LoginForm from '@/features/authentication/components/LoginForm';
import withTheme from '@/libs/antd/theme';

const LoginPage = () => {
  const onSubmit = () => {};
  return withTheme(<LoginForm disabled={false} onSubmit={onSubmit} />);
};

export default LoginPage;
