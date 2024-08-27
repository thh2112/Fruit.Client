import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Providers from '@/app/providers';
import { DEFAULT_LANGUAGE } from '@/shared/constant';
import { SessionProvider } from 'next-auth/react';
import { authOptions } from '@/libs/next-auth/auth';
import { Session, getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang={DEFAULT_LANGUAGE} dir="ltr">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider session={session as Session}>
          <AntdRegistry>
            <Providers>{children}</Providers>
          </AntdRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
