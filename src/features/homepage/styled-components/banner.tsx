import { MAIN_HOME_PAGE_IMAGE } from '@/constanst/consts';
import styled from '@emotion/styled';

const MAIN_BANNER_HEIGHT = 590;

const MainBannerContainer = styled.div({
  backgroundImage: `url(${MAIN_HOME_PAGE_IMAGE})`,
  backgroundSize: 'contain',
  height: MAIN_BANNER_HEIGHT,
});

export { MainBannerContainer };
