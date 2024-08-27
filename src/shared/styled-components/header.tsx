import { IThemeAntd } from '@/libs/antd/theme';
import { HEADER_HEIGHT } from '../constant';
import styled from '@emotion/styled';
import { Header } from 'antd/es/layout/layout';

const HeaderContainer = styled(Header)((props) => ({
  height: HEADER_HEIGHT,
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03)`,
  padding: '0px 32px',
  zIndex: (props.theme as IThemeAntd).antdToken?.zIndexPopupBase,
  display: 'flex',
  justifyContent: 'space-between',
}));

const AuthenticateHeaderContainer = styled(HeaderContainer)((props) => ({
  position: 'fixed',
  width: '100%',
}));
export { HeaderContainer, AuthenticateHeaderContainer };
