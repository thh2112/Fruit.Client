import { DEFAULT_USER_IMAGE } from '@/constanst/consts';
import { IThemeAntd } from '@/libs/antd/theme-provider';
import { authSetting } from '@/routes';
import { ClassNames } from '@emotion/react';
import { Avatar, Dropdown, MenuProps, Space, Typography } from 'antd';
import { LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useMemo } from 'react';

const { Text } = Typography;

interface IHeaderAccountDropdownProps {
  userInfo: any;
}
const HeaderAccountDropdown = ({ userInfo }: IHeaderAccountDropdownProps) => {
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: (
          <Link href={authSetting.myProfile()}>
            <Text>My Profile</Text>
          </Link>
        ),
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
        label: <Text>Log Out</Text>,
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
        onClick: () => {
          signOut({ redirect: true, callbackUrl: authSetting.login() });
        },
        key: 'logout',
      },
    ],
    [],
  );
  return (
    <Dropdown
      menu={{ items }}
      trigger={['hover']}
      placement="bottomRight"
      align={{ offset: [0, 8] }}
      overlayStyle={{ width: '200px' }}
    >
      <Link href={authSetting.myProfile()}>
        <Space>
          <Typography.Text style={{ fontWeight: 500 }}>{userInfo?.name}</Typography.Text>
          <Avatar src={userInfo.image || DEFAULT_USER_IMAGE} size={40} />
        </Space>
      </Link>
    </Dropdown>
  );
};

export default HeaderAccountDropdown;
