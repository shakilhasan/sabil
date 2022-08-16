import 'emoji-mart/css/emoji-mart.css';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, IconButton, ClickAwayListener } from '@mui/material';
// utils
import cssStyles from '../utils/cssStyles';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  position: 'relative',
});

const PickerStyle = styled('div')(({ theme }) => ({
  bottom: 40,
  overflow: 'hidden',
  position: 'absolute',
  left: theme.spacing(-2),
  boxShadow: theme.customShadows.z20,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  '& .emoji-mart': {
    border: 'none',
    backgroundColor: theme.palette.background.paper,
  },
  '& .emoji-mart-anchor': {
    color: theme.palette.text.disabled,
    '&:hover, &:focus, &.emoji-mart-anchor-selected': {
      color: theme.palette.text.primary,
    },
  },
  '& .emoji-mart-bar': { borderColor: theme.palette.divider },
  '& .emoji-mart-search input': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    borderColor: theme.palette.grey[500_32],
    '&::placeholder': {
      ...theme.typography.body2,
      color: theme.palette.text.disabled,
    },
  },
  '& .emoji-mart-search-icon svg': {
    opacity: 1,
    fill: theme.palette.text.disabled,
  },
  '& .emoji-mart-category-label span': {
    ...theme.typography.subtitle2,
    ...cssStyles().bgBlur({ color: theme.palette.background.paper }),
    color: theme.palette.text.primary,
  },
  '& .emoji-mart-title-label': { color: theme.palette.text.primary },
  '& .emoji-mart-category .emoji-mart-emoji:hover:before': {
    backgroundColor: theme.palette.action.selected,
  },
  '& .emoji-mart-emoji': { outline: 'none' },
  '& .emoji-mart-preview-name': {
    color: theme.palette.text.primary,
  },
  '& .emoji-mart-preview-shortname, .emoji-mart-preview-emoticon': {
    color: theme.palette.text.secondary,
  },
}));

// ----------------------------------------------------------------------

EmojiPicker.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
  alignRight: PropTypes.bool,
};

export default function EmojiPicker({ disabled, value, setValue, alignRight = false, ...other }) {
  const theme = useTheme();
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        color={theme.palette.primary.main}
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={(emoji) => setValue(value + emoji?.native)}
      />
    );
  }

  const triggerPicker = (event) => {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };

  const handleClickAway = () => {
    SetEmojiPicker(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <RootStyle {...other}>
        <PickerStyle
          sx={{
            ...(alignRight && {
              right: -2,
              left: 'auto !important',
            }),
          }}
        >
          {emojiPicker}
        </PickerStyle>
        <IconButton disabled={disabled} size="small" onClick={triggerPicker}>
          <Iconify icon={'eva:smiling-face-fill'} width={20} height={20} />
        </IconButton>
      </RootStyle>
    </ClickAwayListener>
  );
}
