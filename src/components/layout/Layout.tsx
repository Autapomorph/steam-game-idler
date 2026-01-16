import type { PropsWithChildren } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
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
