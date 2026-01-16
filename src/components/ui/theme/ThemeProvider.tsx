import type { PropsWithChildren } from 'react';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
} from 'next-themes';

type Props = PropsWithChildren & Omit<NextThemesProviderProps, 'children'>;

export const ThemeProvider = ({ children, ...props }: Props) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
