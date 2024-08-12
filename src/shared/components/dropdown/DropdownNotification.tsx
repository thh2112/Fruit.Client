import { PRIVATE_ROUTER } from '@/routes';
import type { MenuProps } from 'antd';
import { Avatar, Divider, Flex, Menu } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

interface MenuElement {
  avatar: string;
  content: string;
}

const items: MenuElement[] = [
  {
    avatar: '/assets/images/favicon.png',
    content: 'Long has done a lot of work on this project.',
  },
  {
    avatar: '/assets/images/favicon.png',
    content: 'Long has done a lot of work on this project.',
  },
  {
    avatar: '/assets/images/favicon.png',
    content: 'Long has done a lot of work on this project.',
  },
  {
    avatar: '/assets/images/favicon.png',
    content: 'Long has done a lot of work on this project.',
  },
  {
    avatar: '/assets/images/favicon.png',
    content: 'Long has done a lot of work on this project.',
  },
];
const DropdownNotification = () => {
  const onClick: MenuProps['onClick'] = (e) => {};
  return (
    <div>
      <Menu
        style={{ width: 350, marginTop: '20px', height: '50vh' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['Profile']}
        mode="inline"
      >
        <div style={{ height: '40vh', overflow: 'auto' }}>
          <Divider style={{ fontSize: 20, fontWeight: 'bold' }}>Thông báo</Divider>

          <Flex gap="middle" vertical>
            <Flex style={{ padding: 20 }} justify="space-between" align="center">
              <span style={{ fontWeight: 'bold', fontSize: 16 }}>Mới</span>
              <Link style={{ color: 'blue', fontSize: 16 }} href="/notification">
                Xem tất cả
              </Link>
            </Flex>
          </Flex>

          {items?.map((ele: any) => (
            <Menu.Item key={ele.key} style={{ marginBottom: '10px', backgroundColor: 'white' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Flex style={{ fontSize: 14, margin: 0 }} justify="start" align="center">
                  <Avatar src={ele.avatar} size={30} />
                  <div style={{ marginLeft: '10px' }}>{ele.content}</div>
                  {/* <MoreOutlined size={16} /> */}
                </Flex>
              </div>
            </Menu.Item>
          ))}
        </div>
        <Divider style={{ marginTop: '30px' }}>
          <Link href={PRIVATE_ROUTER.NOTIFICATION}>Xem tất cả thông báo</Link>
        </Divider>
      </Menu>
    </div>
  );
};

export default DropdownNotification;
