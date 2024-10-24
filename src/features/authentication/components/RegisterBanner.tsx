'use client';
import { REGISTER_BANNER } from '@/shared/constant';
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';

interface RegisterBannerProps {
  image: string;
}

const RegisterBanner = ({ image }: RegisterBannerProps) => {
  const [isRequestFailed, setIsRequestFailed] = useState<boolean>(false);

  const imageUrl = useMemo(() => {
    return isRequestFailed ? REGISTER_BANNER : image;
  }, [isRequestFailed]);

  return <BannerContainer imageUrl={imageUrl}></BannerContainer>;
};
interface BannerContainerProps {
  imageUrl: string;
}
export const BannerContainer = styled.div<BannerContainerProps>((props) => ({
  flex: 2,
  position: 'relative',
  height: '100%',
  width: '100%',
  backgroundImage: `url(${props.imageUrl})`,
  backgroundSize: 'cover',
  backgroundPositionY: 'center',
}));

export default RegisterBanner;
