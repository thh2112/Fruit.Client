import Providers from '@/app/providers';
import StyledComponentsRegistry from '@/libs/antd/antd-registry';
import CustomStyleConfigProvider from '@/libs/antd/custom-config-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
  return (
    <html lang={lng} dir="ltr">
      <body className={inter.className} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <CustomStyleConfigProvider>
            <Providers>{children}</Providers>
          </CustomStyleConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
