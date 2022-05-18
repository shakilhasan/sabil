import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Typography, DialogContent } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import { DialogAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(1.5),
}));

// ----------------------------------------------------------------------

ChatRoomPopup.propTypes = {
  participant: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function ChatRoomPopup({ participant, isOpen, onClose }) {
  const { name, avatar, position, address, phone, email } = participant;

  return (
    <DialogAnimate fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogContent sx={{ pb: 5, textAlign: 'center' }}>
        <Avatar
          alt={name}
          src={avatar}
          sx={{
            mt: 5,
            mb: 2,
            mx: 'auto',
            width: 96,
            height: 96,
          }}
        />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
          {position}
        </Typography>

        <RowStyle>
          <Iconify icon={'eva:pin-fill'} sx={{ mr: 1, width: 16, height: 16, color: 'text.disabled' }} />
          <Typography variant="body2">{address}</Typography>
        </RowStyle>
        <RowStyle>
          <Iconify icon={'eva:phone-fill'} sx={{ mr: 1, width: 16, height: 16, color: 'text.disabled' }} />
          <Typography variant="body2">{phone}</Typography>
        </RowStyle>
        <RowStyle>
          <Iconify icon={'eva:email-fill'} sx={{ mr: 1, width: 16, height: 16, color: 'text.disabled' }} />
          <Typography variant="body2">{email}</Typography>
        </RowStyle>
      </DialogContent>
    </DialogAnimate>
  );
}
