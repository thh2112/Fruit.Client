import { FlexContainer, MainHeaderContainer } from '@/shared/styled-components/headers/main-header';
import Logo from '../Logo';
import MainHeaderAuthSection from './MainHeaderAuthSection';
import { Divider, Flex } from 'antd';
import MultiLanguage from '../MultiLanguage';
import TheHeaderNav from './TheHeaderNav';

const MainHeader = () => {
  const onLogin = () => {};
  const onRegister = () => {};

  return (
    <MainHeaderContainer>
      <FlexContainer align="center">
        <Logo />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <TheHeaderNav />
        </div>
        <Flex justify="end" align="center" gap="middle">
          <MultiLanguage />
          <Divider type="vertical" style={{ height: 32, margin: 0 }} />
          <MainHeaderAuthSection onLogin={onLogin} onRegister={onRegister} />
        </Flex>
      </FlexContainer>
    </MainHeaderContainer>
  );
};

export default MainHeader;
