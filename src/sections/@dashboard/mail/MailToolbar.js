import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tooltip, Checkbox, Typography, IconButton, InputAdornment } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 84,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
}));

// ----------------------------------------------------------------------

MailToolbar.propTypes = {
  mails: PropTypes.number.isRequired,
  selectedMails: PropTypes.number.isRequired,
  onOpenSidebar: PropTypes.func,
  onToggleDense: PropTypes.func,
  onSelectAll: PropTypes.func,
  onDeselectAll: PropTypes.func,
};

export default function MailToolbar({
  mails,
  selectedMails,
  onOpenSidebar,
  onToggleDense,
  onSelectAll,
  onDeselectAll,
  ...other
}) {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const handleSelectChange = (checked) => (checked ? onSelectAll() : onDeselectAll());
  const selectedAllMails = selectedMails === mails && mails > 0;
  const selectedSomeMails = selectedMails > 0 && selectedMails < mails;

  return (
    <RootStyle {...other}>
      {!mdUp && (
        <IconButton onClick={onOpenSidebar}>
          <Iconify icon={'eva:menu-fill'} />
        </IconButton>
      )}

      {smUp && (
        <>
          <Checkbox
            checked={selectedAllMails}
            indeterminate={selectedSomeMails}
            onChange={(event) => handleSelectChange(event.target.checked)}
          />
          <Tooltip title="Refresh">
            <IconButton>
              <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dense">
            <IconButton onClick={onToggleDense}>
              <Iconify icon={'eva:collapse-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="More">
            <IconButton>
              <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <InputStyle
        stretchStart={180}
        size="small"
        placeholder="Search mail…"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      {smUp && (
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
            1 - {mails} of {mails}
          </Typography>
          <Tooltip title="Next page">
            <IconButton>
              <Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous page">
            <IconButton>
              <Iconify icon={'eva:arrow-ios-forward-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </RootStyle>
  );
}
