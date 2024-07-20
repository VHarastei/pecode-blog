import { useMemo } from 'react';
import { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

interface IProps extends AppProps {
  children: React.ReactNode;
}

export default function ThemeProvider(props: IProps) {
  const { children } = props;

  const memoizedValue = useMemo(
    () => ({
      typography,
      palette: palette('light'),
    }),
    []
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  return (
    <AppCacheProvider {...props}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppCacheProvider>
  );
}
