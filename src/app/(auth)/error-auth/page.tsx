import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import withTheme from '@/core/lib/antd/with-theme';
import { setBrowserTabTitle } from '@/core/utils';

const ErrorAuth = dynamic(() => import('./ErrorAuth'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: setBrowserTabTitle('Error Authenticate'),
};

const ErrorAuthPage = () => {
  return withTheme(<ErrorAuth />);
};

export default ErrorAuthPage;
