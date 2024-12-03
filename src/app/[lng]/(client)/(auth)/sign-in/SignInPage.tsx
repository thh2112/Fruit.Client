'use client';

import { LogInForm } from '@/features/authentication/components/LogInForm';
import { Flex, Typography } from 'antd';

const { Title } = Typography;

const SignInPage = () => {
  const handleSubmit = () => {};

  return (
    <Flex justify="center" align="center" style={{ padding: 24, minHeight: 400 }} vertical>
      <Title level={3} style={{ marginBottom: 48 }}>
        Log In
      </Title>
      <LogInForm onSubmit={handleSubmit} loading={false} initialValue={{} as any} />
    </Flex>
  );
};

export default SignInPage;
