import Link from 'next/link';
import styled from '@emotion/styled';
import { IThemeAntd } from '@/libs/antd/theme-provider';

export const NavLink = styled(Link)((props) => ({
  color: 'inherit',
  fontWeight: 'inherit',
  padding: '12px 0',
  textTransform: 'capitalize',
  transition: 'all 0.25s',
  ':hover': {
    color: 'inherit',
  },
  ':before': {
    content: 'attr(aria-label)',
    display: 'block',
    fontWeight: (props?.theme as IThemeAntd)?.antdToken?.fontWeightStrong,
    textAlign: 'center',
    overflow: 'hidden',
    visibility: 'hidden',
    height: 0,
  },
}));
