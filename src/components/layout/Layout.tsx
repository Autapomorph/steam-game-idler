import type { PropsWithChildren } from 'react';
import Head from 'next/head';
import localFont from 'next/font/local';

const inter = localFont({
  src: [
    {
      path: '../../fonts/inter/Inter-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
});

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Steam Game Idler</title>
      </Head>

      <main className={`${inter.className} h-full min-h-screen text-content bg-gradient-bg`}>
        {children}
      </main>
    </>
  );
};
