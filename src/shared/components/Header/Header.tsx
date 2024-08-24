'use client';

import { Layout } from 'antd';
import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/shared/constant';
import { theme } from 'antd';
import HeaderBrand from '@/shared/components/header/HeaderBrand';
import HeaderAccount from '@/shared/components/header/HeaderAccount';
import { IThemeAntd } from '@/libs/antd/theme';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  const token = theme.useToken();
  return (
    <HeaderContainer>
      <HeaderBrand />
      <HeaderAccount />
    </HeaderContainer>
  );
};

const HeaderContainer = styled(HeaderAntd)((props) => ({
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

export default Header;
