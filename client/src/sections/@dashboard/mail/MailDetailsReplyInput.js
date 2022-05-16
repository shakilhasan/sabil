import { useRef, useState } from 'react';
// @mui
import { Box, Button, TextField, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function MailDetailsReplyInput() {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        value={message}
        placeholder="Type a message"
        onChange={handleChangeMessage}
        sx={{ '& fieldset': { border: 'none !important' } }}
      />

      <Box
        sx={{
          mr: 3,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton size="small" onClick={handleAttach}>
          <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
        </IconButton>

        <IconButton size="small" onClick={handleAttach} sx={{ ml: 1, mr: 2 }}>
          <Iconify icon={'eva:attach-2-fill'} width={24} height={24} />
        </IconButton>

        <Button variant="contained">Send</Button>
      </Box>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </>
  );
}
