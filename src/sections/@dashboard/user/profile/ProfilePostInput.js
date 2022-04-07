import { useRef } from 'react';
// @mui
import { Box, Card, Button, TextField, IconButton } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
          },
        }}
      />

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
            <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
          </IconButton>
          <IconButton size="small" onClick={handleAttach}>
            <Iconify icon={'eva:attach-2-fill'} width={24} height={24} />
          </IconButton>
        </Box>
        <Button variant="contained">Post</Button>
      </Box>

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Card>
  );
}
