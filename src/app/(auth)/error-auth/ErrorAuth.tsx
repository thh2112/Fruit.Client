'use client';
import { authSetting } from '@/routes/navigate';
import { sanitizeHTML } from '@/shared/helpers/sanitize-html';
import { Button, Result } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

const ErrorAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');
  const sanitizeError = sanitizeHTML(decodeURIComponent(errorMessage || ''));

  return (
    <Result
      style={{ paddingTop: '200px' }}
      status="error"
      title=" Failed"
      subTitle={sanitizeError}
      extra={[
        <Button type="primary" key="try-again" onClick={() => router.push(authSetting.login())}>
          Try Again
        </Button>,
      ]}
    ></Result>
  );
};

export default ErrorAuth;
