'use client';
import { REGISTER_BANNER } from '@/shared/constant';
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { media } from '@/shared/styles/media-queries';

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
  paddingLeft: '66%',
  backgroundImage: `url(${props.imageUrl})`,
  backgroundSize: 'cover',
  backgroundPositionY: 'center',
  display: 'none',
  [media('xl')]: {
    display: 'flex',
  },
}));

export default RegisterBanner;
