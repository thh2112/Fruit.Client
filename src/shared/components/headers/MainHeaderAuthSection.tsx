import { AccountInformation } from '@/features/authentication/types/auth';
import { ButtonAuthStyle } from '@/shared/styled-components/headers/main-header';
import { Flex } from 'antd';
import { useContext, useEffect, useState } from 'react';
import HeaderAccountDropdown from './HeaderAccountDropdown';
import { SessionWrapperContext } from '@/app/[lng]/providers';

interface MainHeaderAuthSectionProps {
  onLogin: () => void;
  onRegister: () => void;
}
const MainHeaderAuthSection = ({ onLogin, onRegister }: MainHeaderAuthSectionProps) => {
  const {
    state: { session },
  } = useContext(SessionWrapperContext);

  const [userInfo, setUserInfo] = useState<AccountInformation | null>();

  useEffect(() => {
    setUserInfo(session?.user as AccountInformation);
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
