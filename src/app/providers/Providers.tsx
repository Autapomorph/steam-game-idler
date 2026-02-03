import { type PropsWithChildren } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { TemplateParamsPlugin } from '@unhead/react/plugins';

import { ErrorBoundaryProvider, ThemeProvider, ToastProvider } from '@/shared/ui';

type Props = PropsWithChildren;

const head = createHead({
  plugins: [TemplateParamsPlugin],
});

export const Providers = ({ children }: Props) => {
  return (
    <UnheadProvider head={head}>
      <ThemeProvider>
        <HeroUIProvider className="font-sans">
          <ToastProvider />
          <ErrorBoundaryProvider>{children}</ErrorBoundaryProvider>
        </HeroUIProvider>
      </ThemeProvider>
    </UnheadProvider>
  );
};
