import ThemeProvider from '@theme';
import type { AppProps } from 'next/app';
import { ErrorFallbackView } from '@features/error';
import { ErrorBoundary } from 'react-error-boundary';
import { SnackbarProvider } from '@components/snackbar';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackView} onReset={() => window.location.reload()}>
      <ThemeProvider {...props}>
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
