import { IThemeAntd } from '@/libs/antd/theme';
import { authSetting, routeSetting } from '@/routes/navigate';
import { DRAWER_WIDTH } from '@/shared/constant';
import { getMenuItem } from '@/shared/helpers/menu';
import { MenuContainerMobile } from '@/shared/styled-components/menu';
import { ClassNames } from '@emotion/react';
import { Avatar, Drawer, Flex, MenuProps, theme, Typography } from 'antd';
import _get from 'lodash/get';
import { ChevronRight, ListTodo, LogOut, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

const { Text } = Typography;

const SidebarMenuMobile = () => {
  const {
    token: { colorIcon },
  } = theme.useToken();

  const pathname = usePathname();
  const splitPathname = pathname.split('/');
  const pathActive = '/' + _get(splitPathname, [1], pathname);

  const [open, setOpen] = useState(false);

  const menuItemsMobile: MenuProps['items'] = useMemo(
    () => [
      getMenuItem(
        <Link href={routeSetting.project()}>Task Management</Link>,
        routeSetting.project(),
        <ListTodo size={16} />,
      ),
      { type: 'divider', style: { margin: '12px 0' } },
      getMenuItem(<Link href={authSetting.logout()}>Log Out</Link>, authSetting.logout(), <LogOut size={16} />),
    ],
    [],
  );

  const handleClickIcon = () => {
    setOpen(true);
  };

  return (
    <>
      <MenuIcon color={colorIcon} onClick={handleClickIcon} />
      <Drawer
        width={DRAWER_WIDTH}
        onClose={() => setOpen(false)}
        open={open}
        placement="left"
        styles={{
          body: { padding: 0 },
          header: {
            border: 'none',
            padding: `${(theme as IThemeAntd).antdToken?.padding} ${(theme as IThemeAntd).antdToken?.padding}`,
          },
        }}
      >
        <Account onClose={() => setOpen(false)} />
        <MenuContainerMobile
          mode="inline"
          items={menuItemsMobile}
          selectedKeys={[pathActive]}
          onClick={() => setOpen(false)}
        ></MenuContainerMobile>
      </Drawer>
    </>
  );
};

const Account = ({ onClose }: { onClose: () => void }) => {
  return (
    <ClassNames>
      {({ theme }) => (
        <Link href={''} onClick={onClose}>
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: (theme as IThemeAntd).antdToken?.padding }}
            gap={12}
          >
            <Avatar src={''} size={40} />
            <Text style={{ fontWeight: 500, flex: 1 }}>John Doe</Text>
            <ChevronRight color={(theme as IThemeAntd).antdToken?.colorIcon} />
          </Flex>
        </Link>
      )}
    </ClassNames>
  );
};

export default SidebarMenuMobile;
