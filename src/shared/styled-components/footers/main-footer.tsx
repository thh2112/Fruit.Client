import { IThemeAntd } from '@/libs/antd/theme-provider';
import { media } from '@/shared/styles';
import styled from '@emotion/styled';
import { Flex } from 'antd';
import Link from 'next/link';
export const HEIGHT_HEADER = 140;

const MainFooterContainer = styled.div({
  padding: 8,
  [media('md')]: {
    padding: 24,
  },
});

const LinkFooter = styled(Link)((props) => ({
  color: (props.theme as IThemeAntd)?.antdToken?.colorTextSecondary,
  textDecoration: 'underline',
  '.ant-typography:hover': {
    color: (props.theme as IThemeAntd)?.antdToken?.colorTextTertiary,
    textDecoration: 'underline',
  },
}));

const CopyrightContainer = styled(Flex)({
  justifyContent: 'space-between',
  flexDirection: 'column',
  [media('md')]: {
    flexDirection: 'row',
  },
});

export { MainFooterContainer, LinkFooter, CopyrightContainer };
