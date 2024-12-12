import styled from '@emotion/styled';
import { Spin } from 'antd';

const SpinLoading = styled(Spin)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: 1000,
});

export { SpinLoading };
