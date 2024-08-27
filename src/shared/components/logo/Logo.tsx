import { routeSetting } from '@/routes/navigate';
import { LOGO } from '@/shared/constant';
import { Flex, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const { Title } = Typography;

const Logo = () => {
  return (
    <>
      <Link href={routeSetting.project()}>
        <Flex gap={16} align="center" style={{ height: '100%' }}>
          <Image src={LOGO} alt="logo" width={40} height={40} />
          <Title level={5} style={{ margin: 0 }}>
            Todo List
          </Title>
        </Flex>
      </Link>
    </>
  );
};

export default Logo;
