'use client';
import NextTopLoader from 'nextjs-toploader';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader color="#FACC15" showSpinner={false} />
      {children}
    </>
  );
}
