import { MAIN_HOME_PAGE_IMAGE } from '@/constanst/consts';
import { media } from '@/shared/styles';
import styled from '@emotion/styled';

const MAIN_BANNER_MAX_HEIGHT = 590;
const MAIN_BANNER_MIN_HEIGHT = 200;

const MainBannerContainer = styled.div({
  backgroundImage: `url(${MAIN_HOME_PAGE_IMAGE})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: MAIN_BANNER_MIN_HEIGHT,
  [media('sm')]: {
    height: MAIN_BANNER_MAX_HEIGHT,
  },
});

export { MainBannerContainer };
