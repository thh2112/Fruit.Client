'use client';

import SignUpForm from '@/features/authentication/components/SignUpForm';
import { Flex, Typography } from 'antd';

const SignUpPage = () => {
  const handleSubmit = () => {};
  return (
    <Flex justify="center" align="center" style={{ padding: 24, minHeight: 400 }} vertical>
      <Typography.Title level={3} style={{ marginBottom: 48 }}>
        Sign Up
      </Typography.Title>
      <SignUpForm loading={false} onSubmit={handleSubmit} />
    </Flex>
  );
};

export default SignUpPage;
