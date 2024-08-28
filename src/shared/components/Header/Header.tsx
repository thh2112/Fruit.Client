'use client';

import { HeaderContainer } from '@/shared/styled-components/header';
import { Flex, Popover, theme } from 'antd';
import Logo from '@/shared/components/logo/Logo';
import { Bell } from 'lucide-react';
import DropdownNotification from '@/shared/components/dropdown/DropdownNotification';
import DropdownProfile from '@/shared/components/dropdown/DropdownProfile';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import SidebarMenuMobile from '@/shared/components/sidebar/SidebarMenuMobile';

const Header = () => {
  const {
    token: { paddingLG, screenMDMin },
  } = theme.useToken();

  const isDesktop = useMediaQuery(`only screen and (min-width : ${screenMDMin}px)`);
  return (
    <HeaderContainer>
      <Logo />
      <Flex gap={paddingLG} align="center" justify="center">
        <Popover
          content={<DropdownNotification />}
          arrow={false}
          trigger={'click'}
          placement={'bottom'}
          align={{
            offset: [-32, 16],
          }}
          fresh
          destroyTooltipOnHide
          overlayInnerStyle={{ padding: 0, overflow: 'hidden' }}
        >
          <Bell size={24} style={{ cursor: 'pointer' }} />
        </Popover>
        {isDesktop ? <DropdownProfile /> : <SidebarMenuMobile />}
      </Flex>
    </HeaderContainer>
  );
};

export default Header;
