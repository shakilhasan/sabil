import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Paper, Stack, Button, Popover, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

PaymentNewCardForm.propTypes = {
  onCancel: PropTypes.func,
};

export default function PaymentNewCardForm({ onCancel }) {
  const [isOpen, setIsOpen] = useState(null);

  return (
    <>
      <Paper
        sx={{
          p: 2.5,
          mb: 2.5,
          bgcolor: 'background.neutral',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="subtitle1">Add new card</Typography>
          <TextField fullWidth size="small" label="Name on card" />

          <TextField fullWidth size="small" label="Card number" />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField size="small" label="MM/YY" />
            <TextField
              size="small"
              label="CVV"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end" onClick={(event) => setIsOpen(event.currentTarget)}>
                      <Iconify icon={'eva:info-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button fullWidth onClick={onCancel}>
              Cancel
            </Button>

            <Button fullWidth variant="contained" onClick={onCancel}>
              Create
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Popover
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        onClose={() => setIsOpen(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 200,
          },
        }}
      >
        <Typography variant="body2" align="center">
          Three-digit number on the back of your VISA card
        </Typography>
      </Popover>
    </>
  );
}
