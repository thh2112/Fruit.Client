import { Space } from 'antd';

import FacebookFilledIcon from '@/shared/icons/facebook/FacebookFilledIcon';
import GithubOutlinedIcon from '@/shared/icons/github/GithubOutlinedIcon';
import GoogleOutlinedIcon from '@/shared/icons/google/GoogleOutlinedIcon';

const LoginMethod = () => {
  return (
    <Space
      align="center"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}
      size={24}
    >
      <FacebookFilledIcon />
      <GoogleOutlinedIcon />
      <GithubOutlinedIcon />
    </Space>
  );
};

export default LoginMethod;
