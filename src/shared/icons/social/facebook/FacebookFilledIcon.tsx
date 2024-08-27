import React from 'react';
import { FacebookFilled } from '@ant-design/icons';
import { CSSProperties } from 'react';
import IconStyled from '@/shared/styled-components/IconStyle';
const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const FacebookFilledIcon = () => {
  return (
    <IconStyled style={{ border: '1px solid ' + '#000000' }}>
      <FacebookFilled style={{ ...iconStyles, color: '#1890ff' }} />
    </IconStyled>
  );
};

export default FacebookFilledIcon;
