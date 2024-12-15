'use client';

import SessionProviders from './providers';
import SessionProviderWrapper from '@/shared/contexts/SessionProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProviderWrapper session={null}>
        <SessionProviders>{children}</SessionProviders>;
      </SessionProviderWrapper>
    </>
  );
}
