import { HEADER } from '@layouts/config';

import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export function Header() {
  const theme = useTheme();

  return (
    <AppBar
      color="primary"
      sx={{
        position: 'absolute',
        height: HEADER.H_DESKTOP,
        boxShadow: 'none',
        zIndex: theme.zIndex.appBar + 1,
        display: 'flex',
        justifyContent: 'center',
        px: 10,
        [theme.breakpoints.down('sm')]: {
          height: HEADER.H_MOBILE,
          px: 2,
        },
      }}
    >
      <Typography>Logo</Typography>
    </AppBar>
  );
}
