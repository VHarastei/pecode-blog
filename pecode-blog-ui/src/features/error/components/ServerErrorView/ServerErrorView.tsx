import Link from 'next/link';

import { Stack, Button, Typography } from '@mui/material';

export const ServerErrorView = () => (
  <Stack gap={2} sx={{ mt: 6 }}>
    <Typography variant="h1" align="center">
      Something went wrong
    </Typography>
    <Typography variant="h2" align="center">
      There was an error, please try again later.
    </Typography>
    <Button fullWidth component={Link} href="/">
      Go home
    </Button>
  </Stack>
);
