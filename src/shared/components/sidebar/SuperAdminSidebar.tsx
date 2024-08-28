'use client';

import { routeSetting } from '@/routes/navigate';
import { getMenuItem } from '@/shared/helpers/menu';
import { MenuContainerDesktop } from '@/shared/styled-components/menu';
import { type MenuProps } from 'antd';
import _get from 'lodash/get';
import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const SuperAdminSidebar = () => {
  const pathname = usePathname();
  const splitPathname = pathname.split('/');
  const pathActive = _get(splitPathname, [2], pathname);

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      getMenuItem(
        <Link href={routeSetting.project()}>Task Management</Link>,
        routeSetting.project(),
        <ListTodo size={16} />,
      ),
    ],
    [],
  );
  return (
    <MenuContainerDesktop
      mode="inline"
      selectedKeys={[pathActive]}
      defaultSelectedKeys={[pathActive]}
      items={menuItems}
      selectable={false}
      expandIcon={null}
    ></MenuContainerDesktop>
  );
};

export default SuperAdminSidebar;
