'use client';

import withTheme from '@/libs/antd/theme';
import { AuthenticateHeader } from '@/shared/components/header/AuthenticateHeader';
import { Flex } from 'antd';
import { PropsWithChildren } from 'react';

export const AuthenticateLayout = ({ children }: PropsWithChildren) => {
  return withTheme(
    <Flex vertical>
      <AuthenticateHeader />
      {children}
    </Flex>,
  );
};
