// @mui
import { Stack, Button, Divider, Typography } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthFirebaseSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon={'eva:google-fill'} color="#DF3E30" width={24} height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={24} height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={24} height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
