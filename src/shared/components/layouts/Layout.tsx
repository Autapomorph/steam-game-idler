import Head from 'next/head';
import localFont from 'next/font/local';

import { Titlebar } from '@/shared/components';

const inter = localFont({
  src: [
    {
      path: '../../../fonts/inter/Inter-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../../fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
});

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Steam Game Idler</title>
      </Head>

      <Titlebar />

      <main className={`${inter.className} h-full min-h-screen text-content bg-gradient-bg`}>
        {children}
      </main>
    </>
  );
};
