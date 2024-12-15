import { SessionAction, SessionWrapperContext } from '@/app/[lng]/providers';
import withTheme from '@/libs/antd/with-theme';
import { authSetting } from '@/routes';
import MainFooter from '@/shared/components/footers/MainFooter';
import MainHeader from '@/shared/components/headers/MainHeader';
import { Divider } from 'antd';
import _debounce from 'lodash/debounce';
import { getSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useContext, useEffect, useMemo } from 'react';

const ClientLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const hasPadding = useMemo(() => {
    const pathnames = [authSetting.myProfile(), authSetting.changePassword()];

    return pathnames.some((path) => pathname.includes(path));
  }, [pathname]);

  const { dispatch } = useContext(SessionWrapperContext);

  useEffect(() => {
    const session = _debounce(async () => {
      const sessions = await getSession();
      dispatch({
        type: SessionAction.SET_SESSION,
        payload: sessions,
      });
    }, 100);

    session();

    return () => session.cancel();
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
