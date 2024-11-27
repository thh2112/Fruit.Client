import { CopyrightContainer, MainFooterContainer } from '@/shared/styled-components/footers/main-footer';
import { Divider, Flex, Typography } from 'antd';
import Logo from '../Logo';
import SocialMedia from './SocialMedia';

const MainFooter = () => {
  return (
    <MainFooterContainer>
      <Flex align="center" justify="center" vertical gap="middle">
        <Logo />
        <Typography.Title level={5} style={{ textTransform: 'uppercase', margin: 0, textAlign: 'center' }}>
          Công ty thực phẩm hữu cơ & tự nhiên Sea Fruits
        </Typography.Title>
        <Flex vertical gap="small" align="center">
          <Typography.Text>Trụ sở chính: Huyện Hương Sơn, tỉnh Hà Tĩnh</Typography.Text>
          <Typography.Text>Email: huyhoangtran2112@gmail.com</Typography.Text>
        </Flex>
      </Flex>
      <Divider />
      <CopyrightContainer gap="small">
        <SocialMedia />
        <Typography.Text>© 2024 Sea Fruits. All rights reserved.</Typography.Text>
      </CopyrightContainer>
    </MainFooterContainer>
  );
};

export default MainFooter;
