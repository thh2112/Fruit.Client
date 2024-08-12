import { Flex } from 'antd';
import Image from 'next/image';
import React from 'react';

const HeaderBrand = () => {
  return (
    <Flex align="center">
      <a href="/">
        <Image src={'/assets/images/logo.png'} width={48} height={48} alt={'logo'} />
        <label style={{ fontFamily: 'cursive', fontSize: 20, fontWeight: 'thin', cursor: 'pointer' }}> Todo List</label>
      </a>
    </Flex>
  );
};

export default HeaderBrand;
