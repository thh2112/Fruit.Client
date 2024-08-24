import { Divider, Flex, Typography } from 'antd';

const { Title } = Typography;

const DropdownNotification = () => {
  return (
    <Flex vertical gap={8} style={{ minWidth: 400, padding: 16 }}>
      <Flex vertical>
        <Title level={5}>Notification</Title>
        <Divider style={{ margin: 0 }} />
      </Flex>
    </Flex>
  );
};

export default DropdownNotification;
