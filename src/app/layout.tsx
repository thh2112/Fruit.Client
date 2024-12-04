import Providers from '@/app/providers';
import StyledComponentsRegistry from '@/libs/antd/antd-registry';
import CustomStyleConfigProvider from '@/libs/antd/custom-config-provider';
import SessionProviderWrapper from '@/shared/contexts/SessionProvider';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/shared/contexts/SessionProvider';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sea Fruits',
  description: '',
  icons: [{ rel: 'icon', type: 'image/x-icon', url: '/assets/images/favicon.ico' }],
};

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang={lng} dir="ltr">
      <body className={inter.className} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <CustomStyleConfigProvider>
            <SessionProvider session={session as Session}>
              <Providers>{children}</Providers>
            </SessionProvider>
          </CustomStyleConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
