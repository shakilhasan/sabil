// @mui
import { Stack, Paper, Button, Tooltip, OutlinedInput, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';

// ----------------------------------------------------------------------

export default function KanbanTaskCommentInput() {
  return (
    <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
      <MyAvatar />

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1 }}>
        <OutlinedInput
          fullWidth
          multiline
          rows={2}
          placeholder="Type a message"
          sx={{ '& fieldset': { display: 'none' } }}
        />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Add photo">
              <IconButton size="small">
                <Iconify icon={'ic:round-add-photo-alternate'} width={20} height={20} />
              </IconButton>
            </Tooltip>
            <IconButton size="small">
              <Iconify icon={'eva:attach-2-fill'} width={20} height={20} />
            </IconButton>
          </Stack>

          <Button variant="contained">Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
