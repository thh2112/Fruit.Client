import { Divider, Flex, Typography } from 'antd';
import Image from 'next/image';
import SocialMedia from './SocialMedia';

const MainFooter = () => {
  return (
    <div style={{ padding: 24 }}>
      <Flex align="center" justify="center" vertical gap="middle">
        <Image src="/assets/logo.png" alt="logo" width={100} height={28} />
        <Typography.Title level={5} style={{ textTransform: 'uppercase', margin: 0 }}>
          Công ty thực phẩm hữu cơ & tự nhiên Sea Fruits
        </Typography.Title>
        <Flex vertical gap="small" align="center">
          <Typography.Text>Trụ sở chính: Huyện Hương Sơn, tỉnh Hà Tĩnh</Typography.Text>
          <Typography.Text>Email: huyhoangtran2112@gmail.com</Typography.Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex justify="space-between">
        <SocialMedia />
        <Typography.Text>© 2024 Sea Fruits. All rights reserved.</Typography.Text>
      </Flex>
    </div>
  );
};

export default MainFooter;
