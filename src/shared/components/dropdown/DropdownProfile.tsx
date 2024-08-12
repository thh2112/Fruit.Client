import React from 'react';
import { LoginOutlined, UserOutlined, SettingOutlined, RightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface MenuElement {
  key: string;
  label: string;
  icon: JSX.Element;
}
const items: MenuItem[] = [
  {
    key: 'Profile',
    label: 'Profile',
    icon: <UserOutlined style={{ fontSize: 16 }} />,
  },
  {
    key: 'Settings',
    label: 'Settings',
    icon: <SettingOutlined style={{ fontSize: 16 }} />,
  },
  {
    key: 'Log out',
    label: 'Log out',
    icon: <LoginOutlined style={{ fontSize: 16 }} />,
  },
];

const DropdownProfile = () => {
  const onClick: MenuProps['onClick'] = (e) => {};

  return (
    <Menu style={{ width: 156 }} defaultSelectedKeys={['1']} defaultOpenKeys={['Profile']} mode="inline">
      <div style={{ padding: '10px 0px' }}>
        {items?.map((ele: any) => (
          <Menu.Item key={ele.key} icon={ele.icon} style={{ marginBottom: '10px', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {ele.label}
              <RightOutlined style={{ fontSize: 10 }} />
            </div>
          </Menu.Item>
        ))}
      </div>
    </Menu>
  );
};

export default DropdownProfile;
