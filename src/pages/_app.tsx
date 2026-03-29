import type { AppProps } from 'next/app';
import { useTranslation } from 'react-i18next';
import { Toast } from '@heroui/react';
import { I18nProvider as ReactAriaI18nProvider } from '@react-aria/i18n';

import { FullscreenLoader, Layout } from '@/shared/components';
import { ErrorBoundaryProvider, I18nProvider, ThemeProvider } from '@/shared/providers';
import { useLoaderStore, useStateStore } from '@/shared/stores';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const { i18n } = useTranslation();
  const { loadingUserSummary } = useStateStore();
  const { loaderFadeOut } = useLoaderStore();

  return (
    <I18nProvider>
      <ReactAriaI18nProvider locale={i18n.language}>
        <ThemeProvider
          attribute="data-theme"
          themes={['dark', 'black']}
          enableSystem
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Toast.Provider className="rounded-sm" />
          <ErrorBoundaryProvider>
            {loadingUserSummary && <FullscreenLoader loaderFadeOut={loaderFadeOut} />}
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorBoundaryProvider>
        </ThemeProvider>
      </ReactAriaI18nProvider>
    </I18nProvider>
  );
};

export default App;
