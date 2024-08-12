import React from 'react';
import { Flex, Button, Space, Avatar, Dropdown, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Sun, Moon, Bell } from 'lucide-react';
import DropdownNotification from '../dropdown/DropdownNotification';
import DropdownProfile from '../dropdown/DropdownProfile';

const HeaderAccount = () => {
  // const { changeTheme, isThemeLight } = useTheme();
  // const token = theme.useToken();

  return (
    <Flex gap={30} align="center" justify="center">
      {/* <Button type="text" size="large" onClick={changeTheme}>
        {isThemeLight ? <Sun size={20} /> : <Moon size={20} />}
      </Button> */}
      <Button type="text" size="large">
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Dropdown overlay={<DropdownNotification />} trigger={['click']} placement="bottom">
              <Bell style={{ fontSize: 20 }} />
            </Dropdown>
          </Space>
        </Space>
      </Button>
      <Button type="link" size="large">
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Dropdown overlay={<DropdownProfile />} trigger={['click']}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Space>
      </Button>
    </Flex>
  );
};

export default HeaderAccount;
