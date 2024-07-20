import Link from 'next/link';

import { Box, Stack, Button, Typography } from '@mui/material';

export const NotFoundView = () => (
  <Stack alignItems="center" gap={2} sx={{ mt: 6 }}>
    <Typography variant="h1" align="center">
      Page not found!
    </Typography>
    <Box>
      <Button fullWidth component={Link} href="/">
        Go home
      </Button>
    </Box>
  </Stack>
);
