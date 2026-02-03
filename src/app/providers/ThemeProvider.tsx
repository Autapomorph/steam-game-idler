import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
} from 'next-themes';

type Props = React.PropsWithChildren & Omit<NextThemesProviderProps, 'children'>;

export const ThemeProvider = ({ children, ...props }: Props) => {
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
