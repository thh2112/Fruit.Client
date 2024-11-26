import MainFooter from '@/shared/components/footers/MainFooter';
import MainHeader from '@/shared/components/headers/MainHeader';
import { PropsWithChildren } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  );
};

export default ClientLayout;
