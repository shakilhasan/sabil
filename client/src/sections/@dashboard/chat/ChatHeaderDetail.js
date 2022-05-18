import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Avatar, Typography, AvatarGroup, IconButton } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import BadgeStatus from '../../../components/BadgeStatus';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
}));

// ----------------------------------------------------------------------

ChatHeaderDetail.propTypes = {
  participants: PropTypes.array.isRequired,
};

export default function ChatHeaderDetail({ participants }) {
  const isGroup = participants.length > 1;

  return (
    <RootStyle>
      {isGroup ? <GroupAvatar participants={participants} /> : <OneAvatar participants={participants} />}

      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <Iconify icon="eva:phone-fill" width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:video-fill" width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

OneAvatar.propTypes = {
  participants: PropTypes.array.isRequired,
};

function OneAvatar({ participants }) {
  const participant = [...participants][0];

  if (participant === undefined || !participant.status) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src={participant.avatar} alt={participant.name} />
        <BadgeStatus status={participant.status} sx={{ position: 'absolute', right: 2, bottom: 2 }} />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{participant.name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {participant.status !== 'offline' ? capitalCase(participant.status) : fToNow(participant.lastActivity || '')}
        </Typography>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

GroupAvatar.propTypes = {
  participants: PropTypes.array.isRequired,
};

function GroupAvatar({ participants }) {
  return (
    <div>
      <AvatarGroup
        max={3}
        sx={{
          mb: 0.5,
          '& .MuiAvatar-root': { width: 32, height: 32 },
        }}
      >
        {participants.map((participant) => (
          <Avatar key={participant.id} alt={participant.name} src={participant.avatar} />
        ))}
      </AvatarGroup>
      <Link variant="body2" underline="none" component="button" color="text.secondary" onClick={() => {}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {participants.length} persons
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </Box>
      </Link>
    </div>
  );
}
