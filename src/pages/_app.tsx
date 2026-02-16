import type { AppProps } from 'next/app';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { TbX } from 'react-icons/tb';

import { FullscreenLoader, Layout } from '@/shared/components';
import { ErrorBoundaryProvider, I18nProvider, ThemeProvider } from '@/shared/providers';
import { useLoaderStore, useStateStore } from '@/shared/stores';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const { loadingUserSummary } = useStateStore();
  const { loaderFadeOut } = useLoaderStore();

  return (
    <I18nProvider>
      <ThemeProvider
        attribute="class"
        themes={['dark', 'black']}
        enableSystem
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <HeroUIProvider>
          <ToastProvider
            toastProps={{
              radius: 'sm',
              variant: 'flat',
              timeout: 3000,
              shouldShowTimeoutProgress: true,
              closeIcon: <TbX size={16} className="text-content" />,
              classNames: {
                base: ['bg-sidebar border-none cursor-default'],
                description: ['text-content text-sm font-medium'],
                closeButton: ['opacity-100 absolute right-1 top-1 hover:bg-item-hover'],
              },
            }}
          />
          <ErrorBoundaryProvider>
            {loadingUserSummary && <FullscreenLoader loaderFadeOut={loaderFadeOut} />}
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorBoundaryProvider>
        </HeroUIProvider>
      </ThemeProvider>
    </I18nProvider>
  );
};

export default App;
