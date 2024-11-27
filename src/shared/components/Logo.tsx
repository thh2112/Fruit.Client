import { LOGO_IMAGE } from '@/constanst/consts';
import { LogoImage } from '@/shared/styled-components/common';

const Logo = () => {
  return (
    <>
      <LogoImage src={LOGO_IMAGE} alt="logo" width={100} height={28} />
    </>
  );
};

export default Logo;
