import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

export default function ProfileFollowers({ followers }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Followers
      </Typography>

      <Grid container spacing={3}>
        {followers.map((follower) => (
          <Grid key={follower.id} item xs={12} md={4}>
            <FollowerCard follower={follower} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.object,
};

function FollowerCard({ follower }) {
  const { name, country, avatarUrl, isFollowed } = follower;

  const [toggle, setToogle] = useState(isFollowed);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {country}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={() => setToogle(!toggle)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
      >
        {toggle ? 'Followed' : 'Follow'}
      </Button>
    </Card>
  );
}
