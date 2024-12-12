import withTheme from '@/libs/antd/with-theme';
import { authSetting } from '@/routes';
import MainFooter from '@/shared/components/footers/MainFooter';
import MainHeader from '@/shared/components/headers/MainHeader';
import { Divider } from 'antd';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useMemo } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const hasPadding = useMemo(() => {
    const pathnames = [authSetting.myProfile(), authSetting.changePassword()];

    return pathnames.some((path) => pathname.includes(path));
  }, [pathname]);

  return withTheme(
    <>
      <MainHeader />
      <div style={{ padding: hasPadding ? '24px 32px 0px 32px' : '' }}>
        {children}
        <Divider />
        <MainFooter />
      </div>
    </>,
  );
};

export default ClientLayout;
