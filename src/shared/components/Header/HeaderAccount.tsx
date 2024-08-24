import { Flex, Popover, theme } from 'antd';
import { Bell } from 'lucide-react';
import DropdownNotification from '@/shared/components/dropdown/DropdownNotification';
import DropdownProfile from '@/shared/components/dropdown/DropdownProfile';

const HeaderAccount = () => {
  const {
    token: { paddingLG },
  } = theme.useToken();

  return (
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
      <DropdownProfile />
    </Flex>
  );
};

export default HeaderAccount;
