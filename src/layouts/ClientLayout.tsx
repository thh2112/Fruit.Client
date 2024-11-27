import withTheme from '@/libs/antd/with-theme';
import MainFooter from '@/shared/components/footers/MainFooter';
import MainHeader from '@/shared/components/headers/MainHeader';
import { PropsWithChildren } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  return withTheme(
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>,
  );
};

export default ClientLayout;
