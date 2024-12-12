import { AccountInformation } from '@/features/authentication/types/auth';
import { ButtonAuthStyle } from '@/shared/styled-components/headers/main-header';
import { Flex } from 'antd';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import HeaderAccountDropdown from './HeaderAccountDropdown';

interface MainHeaderAuthSectionProps {
  onLogin: () => void;
  onRegister: () => void;
}
const MainHeaderAuthSection = ({ onLogin, onRegister }: MainHeaderAuthSectionProps) => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<AccountInformation | null>();

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    setUserInfo(session.user as AccountInformation);
  }, [session]);

  return (
    <>
      {userInfo ? (
        <HeaderAccountDropdown userInfo={userInfo} />
      ) : (
        <Flex gap="middle">
          <ButtonAuthStyle type="primary" size="large" onClick={onLogin}>
            Log in
          </ButtonAuthStyle>
          <ButtonAuthStyle size="large" onClick={onRegister}>
            Register
          </ButtonAuthStyle>
        </Flex>
      )}
    </>
  );
};

export default MainHeaderAuthSection;
