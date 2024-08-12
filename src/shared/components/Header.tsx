import { Layout } from 'antd';
import _styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/shared/constant';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  return <HeaderContainer>Header</HeaderContainer>;
};

const HeaderContainer = _styled(HeaderAntd)((props) => ({
  height: HEADER_HEIGHT,
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03)`,
  padding: '0px 16px',
  zIndex: 1000,
}));

export default Header;
