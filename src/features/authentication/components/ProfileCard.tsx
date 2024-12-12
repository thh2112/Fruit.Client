import { DEFAULT_USER_IMAGE } from '@/constanst/consts';
import UploadSingleFile from '@/shared/components/UploadSingleFile';
import { Avatar, Card, Flex, Typography } from 'antd';
const { Text } = Typography;

interface ProfileCardProps {
  avatar: string;
  name: string;
  loading: boolean;
  onSubmit: (file: File[]) => void;
}
const ProfileCard = ({ avatar, name, onSubmit, loading }: ProfileCardProps) => {
  return (
    <Card>
      <Flex gap={24} align="center">
        <Avatar src={avatar || DEFAULT_USER_IMAGE} size={40} />
        <Flex style={{ flex: 1 }} align="center">
          <Text strong style={{ flex: 1 }}>
            {name}
          </Text>
          <UploadSingleFile onSubmit={onSubmit} loading={loading} />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProfileCard;
