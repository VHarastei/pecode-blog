import { FallbackProps } from 'react-error-boundary';

import { Box, Button, Container, Typography } from '@mui/material';

export const ErrorFallbackView = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 6, textAlign: 'center' }}>
    <Typography variant="h2">Something went wrong</Typography>
    <Typography variant="body1">
      There was an error: {error.message}. Please try again later.
    </Typography>
    <Box>
      <Button onClick={resetErrorBoundary}>Try to reload the page</Button>
    </Box>
  </Container>
);
