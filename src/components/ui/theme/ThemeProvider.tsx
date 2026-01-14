import type { PropsWithChildren } from 'react';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
} from 'next-themes';

type ThemeProviderProps = PropsWithChildren & Omit<NextThemesProviderProps, 'children'>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
