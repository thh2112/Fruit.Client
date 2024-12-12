'use client';

import { authSetting } from '@/routes';
import { FlexContainer, MainHeaderContainer } from '@/shared/styled-components/headers/main-header';
import { Divider, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import Logo from '../Logo';
import MultiLanguage from '../MultiLanguage';
import MainHeaderAuthSection from './MainHeaderAuthSection';
import TheHeaderNav from './TheHeaderNav';

const MainHeader = () => {
  const router = useRouter();

  const onLogin = () => {
    router.push(authSetting.login());
  };

  const onRegister = () => {
    router.push(authSetting.register());
  };

  return (
    <MainHeaderContainer>
      <FlexContainer align="center">
        <Logo />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <TheHeaderNav />
        </div>
        <Flex justify="end" align="center" gap="middle">
          <MultiLanguage />
          <Divider type="vertical" style={{ margin: 0 }} />
          <MainHeaderAuthSection onLogin={onLogin} onRegister={onRegister} />
        </Flex>
      </FlexContainer>
    </MainHeaderContainer>
  );
};

export default MainHeader;
