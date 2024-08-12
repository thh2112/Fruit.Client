'use client';

import { Layout } from 'antd';

import { PropsWithChildren } from 'react';
import _styled from '@emotion/styled';
import { media } from '@/shared/styles/media-queries';
import Sidebar from '@/shared/components/sidebar/Sidebar';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@/shared/constant';
import Header from '@/shared/components/header/Header';
import withTheme from '@/libs/antd/theme';

interface MainLayoutProps extends PropsWithChildren {}
const MainLayout = ({ children }: MainLayoutProps) => {
  return withTheme(
    <Layout>
      <Header />
      <Layout>
        <SiderContainer>
          <Sidebar />
        </SiderContainer>
        <ContentLayout>{children}</ContentLayout>
      </Layout>
    </Layout>,
  );
};

const SiderContainer = _styled.div({
  display: 'none',
  [media('xl')]: {
    display: 'initial',
  },
});

const ContentLayout = _styled(Layout)((props) => {
  return {
    marginLeft: SIDEBAR_WIDTH,
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    padding: 24,
  };
});

export default MainLayout;
