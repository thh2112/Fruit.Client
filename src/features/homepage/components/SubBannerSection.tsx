import { Col, Row } from 'antd';
import React from 'react';
import _map from 'lodash/map';
import Image from 'next/image';
import { SUB_BANNER_IMAGE } from '@/constanst/consts';
import styled from '@emotion/styled';

const SubBannerSection = () => {
  const subBanners = [
    {
      image: SUB_BANNER_IMAGE.SUB_BANNER_1,
      alt: 'sub-banner-1',
    },
    {
      image: SUB_BANNER_IMAGE.SUB_BANNER_2,
      alt: 'sub-banner-2',
    },
    {
      image: SUB_BANNER_IMAGE.SUB_BANNER_3,
      alt: 'sub-banner-3',
    },
  ];
  return (
    <Row>
      {_map(subBanners, (item, index) => {
        const column = 24 / subBanners.length;
        return (
          <Col xs={24} md={column} key={index} style={{ height: 354 }}>
            <ImageContainer>
              <BannerImage src={item.image} alt={item.alt} fill />
            </ImageContainer>
          </Col>
        );
      })}
    </Row>
  );
};

const ImageContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const BannerImage = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  transition: 'all 0.25s ease',

  ':hover': {
    scale: 1.1,
  },
}));

export default SubBannerSection;
