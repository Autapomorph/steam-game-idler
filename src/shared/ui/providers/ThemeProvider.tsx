import type { PropsWithChildren } from 'react';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
} from 'next-themes';

type ThemeProviderProps = PropsWithChildren & Omit<NextThemesProviderProps, 'children'>;

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      themes={['dark']}
      enableSystem
      defaultTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};
