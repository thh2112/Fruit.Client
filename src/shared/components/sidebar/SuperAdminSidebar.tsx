'use client';

import { routeSetting } from '@/routes';
import { Menu, type MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import _get from 'lodash/get';
import styled from '@emotion/styled';
import { IThemeAntd } from '@/libs/antd/theme';
import { HEADER_HEIGHT } from '@/shared/constant';
import { getMenuItem } from '@/shared/helpers/menu';
import { ListTodo } from 'lucide-react';

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
    <MenuContainer
      mode="inline"
      selectedKeys={[pathActive]}
      defaultSelectedKeys={[pathActive]}
      items={menuItems}
      selectable={false}
      expandIcon={null}
    ></MenuContainer>
  );
};

const MenuContainer = styled(Menu)((props) => ({
  padding: `${(props.theme as IThemeAntd).antdToken?.paddingMD}px ${(props.theme as IThemeAntd).antdToken?.padding}px`,
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflowY: 'auto',
  '.ant-menu-item-selected': {
    border: `1px solid  ${(props.theme as IThemeAntd).antdToken?.colorPrimary}`,
  },
  '.ant-menu-item > .ant-menu-item-icon': {
    color: (props.theme as IThemeAntd).antdToken?.colorIcon,
  },
  '.ant-menu-item-selected > .ant-menu-item-icon': {
    color: 'inherit',
  },
}));

export default SuperAdminSidebar;
