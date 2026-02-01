import { type PropsWithChildren } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { TemplateParamsPlugin } from '@unhead/react/plugins';

import { ErrorBoundaryProvider, ThemeProvider } from '@/shared/ui';

type Props = PropsWithChildren;

const head = createHead({
  plugins: [TemplateParamsPlugin],
});

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <HeroUIProvider>
        <ErrorBoundaryProvider>
          <UnheadProvider head={head}>{children}</UnheadProvider>
        </ErrorBoundaryProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
};
