'use client';

import { clientSetting } from '@/routes';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button, Flex, Layout } from 'antd';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

export default function NotFoundPage() {
  const router = useRouter();
  const navigateToHome = () => {
    router.push(clientSetting.homePage());
  };

  return (
    <>
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Flex style={{ minHeight: '100dvh' }} align="center" justify="center" vertical>
            <Player autoplay loop src={'/assets/lottie/not-found.json'} style={{ width: '400px' }}></Player>
            <Button type="primary" onClick={navigateToHome}>
              Back to Home
            </Button>
          </Flex>
        </Content>
      </Layout>
    </>
  );
}
