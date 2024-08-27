import IconStyled from '@/shared/styled-components/IconStyle';
import { GoogleOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};
const GoogleOutlinedIcon = () => {
  return (
    <IconStyled style={{ border: '1px solid ' + '#000000' }}>
      <GoogleOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
    </IconStyled>
  );
};

export default GoogleOutlinedIcon;
