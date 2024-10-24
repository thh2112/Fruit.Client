'use client';

import RegisterBanner from '@/features/authentication/components/RegisterBanner';
import RegisterForm from '@/features/authentication/components/RegisterForm';
import useRegister from '@/features/authentication/hooks/useRegister';
import { RegisterPayload } from '@/features/authentication/types/auth';
import withTheme, { IThemeAntd } from '@/libs/antd/theme';
import { authSetting } from '@/routes/navigate';
import Logo from '@/shared/components/logo/Logo';
import { HEADER_HEIGHT, REGISTER_BANNER } from '@/shared/constant';
import { GenderEnum } from '@/shared/enums';
import styled from '@emotion/styled';
import { Divider, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
const { Title } = Typography;

const RegisterPage = () => {
  const router = useRouter();

  const initialValues: RegisterPayload = {
    email: '',
    password: '',
    fullName: '',
    phone: '',
    gender: GenderEnum.FEMALE,
  };

  const handleSuccess = () => {
    router.replace(authSetting.login(), { scroll: false });
  };

  const { trigger, errorMessage } = useRegister({ onSuccess: handleSuccess });
  const handleSubmit = (data: RegisterPayload) => {
    trigger(data);
  };

  console.log('Register', errorMessage);
  return withTheme(
    <div style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <RegisterContainer>
        <RegisterBanner image={REGISTER_BANNER} />
        <RightContentContainer>
          <Logo />
          <div>
            <Title level={4}>Your user account</Title>
            <Divider style={{ marginTop: 0 }} />
            <RegisterForm initialValues={initialValues} onSubmit={handleSubmit} errorMessage={errorMessage} />
          </div>
        </RightContentContainer>
      </RegisterContainer>
    </div>,
  );
};

export const RegisterContainer = styled(Flex)(() => ({
  display: 'flex',
  height: '100%',
  marginTop: HEADER_HEIGHT,
  width: '100vw',
}));

export const RightContentContainer = styled.div((props) => ({
  backgroundColor: (props.theme as IThemeAntd)?.antdToken?.blue1,
  padding: (props.theme as IThemeAntd)?.antdToken?.paddingXL,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: (props.theme as IThemeAntd)?.antdToken?.paddingXL,
}));

export default RegisterPage;
