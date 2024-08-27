import IconStyled from '@/shared/styled-components/IconStyle';
import { GithubOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};
const GithubOutlinedIcon = () => {
  return (
    <IconStyled style={{ border: '1px solid ' + '#000000' }}>
      <GithubOutlined style={{ ...iconStyles, color: '#000000' }} />
    </IconStyled>
  );
};

export default GithubOutlinedIcon;
