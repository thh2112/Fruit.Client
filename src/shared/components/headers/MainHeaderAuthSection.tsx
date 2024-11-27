import { ButtonAuthStyle } from '@/shared/styled-components/headers/main-header';
import { Flex } from 'antd';

interface MainHeaderAuthSectionProps {
  onLogin: () => void;
  onRegister: () => void;
}
const MainHeaderAuthSection = ({ onLogin, onRegister }: MainHeaderAuthSectionProps) => {
  return (
    <Flex gap="middle">
      <ButtonAuthStyle type="primary" size="large">
        Log in
      </ButtonAuthStyle>
      <ButtonAuthStyle size="large">Register</ButtonAuthStyle>
    </Flex>
  );
};

export default MainHeaderAuthSection;
