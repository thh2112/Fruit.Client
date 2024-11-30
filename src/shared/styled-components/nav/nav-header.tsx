import { IThemeAntd } from '@/libs/antd/theme-provider';
import styled from '@emotion/styled';
import { Flex, Typography } from 'antd';
import Link from 'next/link';
const { Text } = Typography;

export const NavContainer = styled(Flex)({
  gap: 48,
  margin: 'auto',
  paddingLeft: 124,
  paddingRight: 64,
});

export const NavItem = styled(Link)((props) => ({}));

export const TextStyled = styled(Text)<{ isSelected: boolean }>((props) => ({
  color: props.isSelected
    ? (props.theme as IThemeAntd)?.antdToken?.colorPrimary
    : (props.theme as IThemeAntd)?.antdToken?.colorTextSecondary,
  '&:hover': {
    color: (props.theme as IThemeAntd)?.antdToken?.colorPrimary,
  },
  fontWeight: 500,
}));
