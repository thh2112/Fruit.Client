import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Providers from '@/app/providers';
import { DEFAULT_LANGUAGE } from '@/constanst/consts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sea Fruits',
  description: '',
  icons: [{ rel: 'icon', type: 'image/x-icon', url: '/assets/images/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LANGUAGE} dir="ltr">
      <body className={inter.className} suppressHydrationWarning>
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
