import { IThemeAntd } from '@/libs/antd/theme';
import { ClassNames } from '@emotion/react';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space, Typography } from 'antd';
import { Link, LogOut, User } from 'lucide-react';
import { useMemo } from 'react';

const { Text } = Typography;

const DropdownProfile = () => {
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: <Text>Profile</Text>,
        icon: (
          <ClassNames>
            {({ theme }) => (
              <User
                size={18}
                color={(theme as IThemeAntd).antdToken?.colorIcon}
                style={{ marginRight: (theme as IThemeAntd).antdToken?.marginXS }}
              />
            )}
          </ClassNames>
        ),
        key: 'my-profile',
      },
      {
        label: <Text>Logout</Text>,
        icon: (
          <ClassNames>
            {({ theme }) => (
              <LogOut
                size={18}
                color={(theme as IThemeAntd).antdToken?.colorIcon}
                style={{ marginRight: (theme as IThemeAntd).antdToken?.marginXS }}
              />
            )}
          </ClassNames>
        ),
        onClick: () => {},
        key: 'logout',
      },
    ],
    [],
  );

  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={['hover']}
        placement="bottomRight"
        align={{ offset: [0, 8] }}
        overlayStyle={{ width: '200px' }}
      >
        <Space>
          <Text style={{ fontWeight: 500 }}>{'John Doe'}</Text>
          <Avatar size={40} />
        </Space>
      </Dropdown>
    </>
  );
};
export default DropdownProfile;
