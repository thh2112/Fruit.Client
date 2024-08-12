'use client';
import { Layout } from 'antd';
import SuperAdminSidebar from '@/shared/components/sidebar/SuperAdminSidebar';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@/shared/constant';
import _styled from '@emotion/styled';

const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider
      width={SIDEBAR_WIDTH}
      theme="light"
      style={{
        minHeight: 'calc(100vh - 60px)',
        maxHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: `${HEADER_HEIGHT}px`,
        bottom: 0,
      }}
    >
      <SuperAdminSidebar />
    </Sider>
  );
}
