import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
import { getFileType, getFileName, getFileThumb } from '../../../utils/getFileFormat';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `solid 1px ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.neutral,
}));

const ThumbStyle = styled('div')(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

const DownloadStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ color: theme.palette.grey[900], opacity: 0.64 }),
  opacity: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 1 },
  '& svg': {
    transition: theme.transitions.create('color'),
    color: alpha(theme.palette.common.white, 0.64),
    '&:hover': { color: theme.palette.common.white },
  },
}));

// ----------------------------------------------------------------------

MailDetailsAttachments.propTypes = {
  mail: PropTypes.object.isRequired,
};

export default function MailDetailsAttachments({ mail }) {
  return (
    <RootStyle>
      <Scrollbar>
        <Box sx={{ display: 'flex' }}>
          {mail.files.map((file) => (
            <FileItem key={file} fileUrl={file} />
          ))}
        </Box>
      </Scrollbar>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

FileItem.propTypes = {
  fileUrl: PropTypes.string,
};

function FileItem({ fileUrl }) {
  return (
    <Box key={fileUrl} sx={{ mx: 0.75 }}>
      <ThumbStyle>
        {getFileThumb(fileUrl)}
        <DownloadStyle>
          <IconButton>
            <Iconify icon={'eva:arrow-circle-down-fill'} />
          </IconButton>
        </DownloadStyle>
      </ThumbStyle>
      <Box
        sx={{
          mt: 0.5,
          maxWidth: 56,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography noWrap variant="caption">
          {getFileName(fileUrl)}
        </Typography>
        <Typography variant="caption">.{getFileType(fileUrl)}</Typography>
      </Box>
    </Box>
  );
}
