import { HeroUIProvider } from '@heroui/react';
import { UnheadProvider } from '@unhead/react/client';

import { head } from '@/app/meta';
import { ErrorBoundaryProvider } from '@/shared/ui';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

type Props = React.PropsWithChildren;

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
