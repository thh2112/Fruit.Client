'use client';

import { authSetting } from '@/routes';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { SessionWrapperContext } from '../../providers';

export default function layout({ children }: { children: React.ReactNode }) {
  const {
    state: { session },
  } = useContext(SessionWrapperContext);

  const { push } = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!session) {
      timeoutId = setTimeout(() => {
        push(authSetting.login());
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [session]);

  return <>{children}</>;
}
