import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Switch, InputBase, Typography } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';

// ----------------------------------------------------------------------

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

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'capitalize',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

const EVENTS = [
  { label: 'Dragging', value: 'isDragging' },
  { label: 'Transition', value: 'inTransition' },
  { label: 'Panning', value: 'isPanning' },
  { label: 'Rotating', value: 'isRotating' },
  { label: 'Zooming', value: 'isZooming' },
];

const camelPattern = /(^|[A-Z])[a-z]*/g;

function formatSettingName(name) {
  return name.match(camelPattern).join(' ');
}

ControlPanel.propTypes = {
  settings: PropTypes.object,
  interactionState: PropTypes.object,
  onChange: PropTypes.func,
};

function ControlPanel({ settings, interactionState, onChange }) {
  const renderSetting = (name, value) => {
    switch (typeof value) {
      case 'boolean':
        return (
          <RowStyle key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <Switch size="small" checked={value} onChange={(event) => onChange(name, event.target.checked)} />
          </RowStyle>
        );
      case 'number':
        return (
          <RowStyle key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <InputBase
              value={value}
              onChange={(event) => onChange(name, Number(event.target.value))}
              inputProps={{ type: 'number' }}
              sx={{
                '& input': {
                  py: 0.25,
                  width: 40,
                  fontSize: 14,
                  borderRadius: 0.5,
                  textAlign: 'center',
                  bgcolor: 'grey.50012',
                  color: 'common.white',
                },
              }}
            />
          </RowStyle>
        );
      default:
        return null;
    }
  };

  return (
    <RootStyle>
      {Object.keys(settings).map((name) => renderSetting(name, settings[name]))}

      {EVENTS.map((event) => (
        <RowStyle key={event.label}>
          <Typography variant="body2">{event.label}</Typography>
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: 1,
              bgcolor: interactionState[event.value] ? 'primary.main' : 'error.main',
            }}
          />
        </RowStyle>
      ))}
    </RootStyle>
  );
}

export default memo(ControlPanel);
