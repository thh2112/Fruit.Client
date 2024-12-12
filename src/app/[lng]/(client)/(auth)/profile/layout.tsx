'use client';

import { AUTH_ROUTE, authSetting } from '@/routes';
import { NavLink } from '@/shared/styled-components/nav/nav-link';
import { Flex, Tabs, Typography } from 'antd';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const { Title } = Typography;

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const splitPathname = pathname.split('/');
  const currentTab = splitPathname[splitPathname.length - 1];

  const tabs = useMemo(
    () => [
      {
        label: <NavLink href={authSetting.myProfile()}>Information</NavLink>,
        key: AUTH_ROUTE.PROFILE,
      },
      {
        label: <NavLink href={authSetting.changePassword()}>Change Password</NavLink>,
        key: AUTH_ROUTE.CHANGE_PASSWORD,
      },
    ],
    [],
  );
  return (
    <Flex vertical gap={16} style={{ minHeight: 'calc(100vh - 370px)' }}>
      <Title level={4}>My Profile</Title>
      <Flex vertical>
        <Tabs activeKey={currentTab} items={tabs} />
        <div>{children}</div>
      </Flex>
    </Flex>
  );
}
