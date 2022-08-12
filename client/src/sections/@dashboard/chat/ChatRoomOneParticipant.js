import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Avatar, Button, Divider, Collapse, Typography } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled,
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(1.5, 0),
}));

const RowIconStyle = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginTop: 4,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const RowTextStyle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 160,
  wordWrap: 'break-word',
  ...theme.typography.body2,
}));

// ----------------------------------------------------------------------

ChatRoomOneParticipant.propTypes = {
  participants: PropTypes.array.isRequired,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
};

export default function ChatRoomOneParticipant({ participants, isCollapse, onCollapse }) {
  const participant = [...participants][0];

  if (participant === undefined) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          pt: 4,
          pb: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar alt={participant.name} src={participant.avatar} sx={{ width: 96, height: 96 }} />
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">{participant.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {participant.position}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <CollapseButtonStyle
        fullWidth
        color="inherit"
        onClick={onCollapse}
        endIcon={
          <Iconify
            icon={isCollapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            width={16}
            height={16}
          />
        }
      >
        information
      </CollapseButtonStyle>

      <Collapse in={isCollapse}>
        <Box sx={{ px: 2.5, pb: 1 }}>
          <RowStyle>
            <RowIconStyle icon={'eva:pin-fill'} />
            <RowTextStyle>{participant.address}</RowTextStyle>
          </RowStyle>
          <RowStyle>
            <RowIconStyle icon={'eva:phone-fill'} />
            <RowTextStyle>{participant.phone}</RowTextStyle>
          </RowStyle>
          <RowStyle>
            <RowIconStyle icon={'eva:email-fill'} />
            <RowTextStyle>{participant.email}</RowTextStyle>
          </RowStyle>
        </Box>
      </Collapse>
    </>
  );
}
