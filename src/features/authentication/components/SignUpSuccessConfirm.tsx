import { Button, Flex, Modal, Typography } from 'antd';
import styled from '@emotion/styled';
import { IThemeAntd } from '@/libs/antd/theme-provider';
import { useRouter } from 'next/navigation';
import { authSetting } from '@/routes';

interface SignUpSuccessConfirmProps {
  open: boolean;
  onCancel: () => void;
}
const SignUpSuccessConfirm = ({ open, onCancel }: SignUpSuccessConfirmProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(authSetting.login());
    onCancel();
  };

  return (
    <Modal
      title={<Typography.Title level={4}>Sign Up</Typography.Title>}
      destroyOnClose
      centered
      closable
      closeIcon={<></>}
      width={520}
      open={open}
      footer={
        <Flex gap={16} justify="end">
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
          <Button onClick={handleOnClick} size="large" type="primary">
            OK
          </Button>
        </Flex>
      }
    >
      <Content>
        <Typography.Text>You have successfully registered. Do you want to return to the login page?</Typography.Text>
      </Content>
    </Modal>
  );
};

const Content = styled(Flex)((props) => ({
  paddingTop: (props.theme as IThemeAntd).antdToken?.paddingMD,
  paddingBottom: (props.theme as IThemeAntd).antdToken?.paddingMD,
}));

export default SignUpSuccessConfirm;
