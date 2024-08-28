import { IThemeAntd } from '@/libs/antd/theme';
import styled from '@emotion/styled';
import { Menu } from 'antd';
import { HEADER_HEIGHT } from '../constant';

const MenuCommon = styled(Menu)((props) => ({
  overflowY: 'auto',
  '.ant-menu-item': {
    border: `1px solid  transparent`,
  },
  '.ant-menu-item-selected': {
    border: `1px solid  ${(props.theme as IThemeAntd).antdToken?.colorBorder}`,
    a: {
      fontWeight: 600,
    },
  },
  '.ant-menu-item > .ant-menu-item-icon': {
    color: (props.theme as IThemeAntd).antdToken?.colorIcon,
  },
  '.ant-menu-item-selected > .ant-menu-item-icon': {
    color: 'inherit',
  },
}));

const MenuContainerDesktop = styled(MenuCommon)((props) => ({
  padding: `${(props.theme as IThemeAntd).antdToken?.paddingMD}px ${(props.theme as IThemeAntd).antdToken?.padding}px`,
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
}));

const MenuContainerMobile = styled(MenuCommon)((props) => ({
  backgroundColor: 'transparent',
  padding: `0 ${(props.theme as IThemeAntd).antdToken?.paddingXS}px ${
    (props.theme as IThemeAntd).antdToken?.padding
  }px`,
  borderRight: 0,
  height: 'max-content',
  borderInlineEnd: '0 !important',
}));

export { MenuContainerDesktop, MenuContainerMobile };
