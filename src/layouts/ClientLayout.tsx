import withTheme from '@/libs/antd/with-theme';
import MainFooter from '@/shared/components/footers/MainFooter';
import MainHeader from '@/shared/components/headers/MainHeader';
import { Divider } from 'antd';
import { PropsWithChildren } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  return withTheme(
    <>
      <MainHeader />
      {children}
      <Divider />
      <MainFooter />
    </>,
  );
};

export default ClientLayout;
