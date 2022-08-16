import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
// @mui
import { Stack, OutlinedInput, MenuItem, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

KanbanColumnToolBar.propTypes = {
  columnName: PropTypes.string,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default function KanbanColumnToolBar({ columnName, onDelete, onUpdate }) {
  const renameRef = useRef(null);

  const [value, setValue] = useState(columnName);

  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClickRename = () => {
    handleClose();
  };

  const handleChangeColumnName = (event) => {
    setValue(event.target.value);
  };

  const handleUpdateColumn = (event) => {
    if (event.key === 'Enter' && renameRef.current) {
      renameRef.current.blur();
      onUpdate(value);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ pt: 3 }}>
        <OutlinedInput
          size="small"
          placeholder="Section name"
          value={value}
          onChange={handleChangeColumnName}
          onKeyUp={handleUpdateColumn}
          inputRef={renameRef}
          sx={{
            typography: 'h6',
            fontWeight: 'fontWeightBold',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          }}
        />

        <IconButton size="small" onClick={handleOpen} color={open ? 'inherit' : 'default'}>
          <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
        </IconButton>
      </Stack>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          Delete section
        </MenuItem>

        <MenuItem onClick={handleClickRename}>
          <Iconify icon={'eva:edit-fill'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
          Rename section
        </MenuItem>
      </MenuPopover>
    </>
  );
}
