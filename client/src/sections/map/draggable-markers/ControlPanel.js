import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';

// ----------------------------------------------------------------------

const EVENT_NAMES = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}
const RootStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ color: theme.palette.grey[900] }),
  zIndex: 9,
  minWidth: 200,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  events: PropTypes.object,
};

function ControlPanel({ events = {} }) {
  return (
    <RootStyle>
      {EVENT_NAMES.map((event) => {
        const lngLat = events[event];
        return (
          <div key={event}>
            <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
              {event}:
            </Typography>
            {lngLat ? (
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                {lngLat.map(round5).join(', ')}
              </Typography>
            ) : (
              <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                <em>null</em>
              </Typography>
            )}
          </div>
        );
      })}
    </RootStyle>
  );
}

export default memo(ControlPanel);
