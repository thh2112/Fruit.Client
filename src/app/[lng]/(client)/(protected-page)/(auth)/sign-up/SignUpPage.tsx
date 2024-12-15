'use client';

import SignUpForm from '@/features/authentication/components/SignUpForm';
import useSignUp from '@/features/authentication/hooks/useSignUp';
import { SignUpFormValue } from '@/features/authentication/types/auth';
import { Divider, Flex, Typography } from 'antd';
import styled from '@emotion/styled';
import Link from 'next/link';
import { authSetting } from '@/routes';
import SignUpSuccessConfirm from '@/features/authentication/components/SignUpSuccessConfirm';
import { useState } from 'react';

const SignUpPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);

  const onSuccess = () => {
    setOpenModal(true);
    setIsRegisterSuccess(true);
  };

  const { trigger, errorMessage, isMutating } = useSignUp({
    onSuccess: onSuccess,
  });

  const handleSubmit = (data: SignUpFormValue) => {
    if (!data) {
      return;
    }

    trigger(data);
  };

  return (
    <>
      <SignUpContainer justify="center" align="center" vertical>
        <Typography.Title level={3} style={{ marginBottom: 36 }}>
          Sign Up
        </Typography.Title>
        <SignUpForm
          loading={isMutating}
          onSubmit={handleSubmit}
          isRegisterSuccess={isRegisterSuccess}
          errorMessage={errorMessage}
        />
        <Divider>
          <Typography.Text color="secondary">or</Typography.Text>
        </Divider>
        <Typography.Text>
          Already have an account? <Link href={authSetting.login()}>Log in</Link> here
        </Typography.Text>
      </SignUpContainer>
      <SignUpSuccessConfirm open={openModal} onCancel={() => setOpenModal(false)} />
    </>
  );
};

const SignUpContainer = styled(Flex)(() => ({
  minHeight: 400,
  padding: 24,
  maxWidth: 450,
  margin: 'auto',
}));

export default SignUpPage;
