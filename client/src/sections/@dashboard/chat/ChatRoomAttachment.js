import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Collapse, Typography } from '@mui/material';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { getFileFullName, getFileThumb } from '../../../utils/getFileFormat';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const FileItemStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 2.5),
}));

const FileThumbStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[500_16],
}));

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  flexShrink: 0,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

ChatRoomAttachment.propTypes = {
  conversation: PropTypes.object.isRequired,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
};

export default function ChatRoomAttachment({ conversation, isCollapse, onCollapse }) {
  const totalAttachment = uniq(flatten(conversation.messages.map((item) => item.attachments))).length;

  return (
    <RootStyle>
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
        attachment ({totalAttachment})
      </CollapseButtonStyle>

      {!isCollapse && <Divider />}

      <Scrollbar>
        <Collapse in={isCollapse}>
          {conversation.messages.map((file) => (
            <div key={file.id}>
              {file.attachments.map((fileUrl) => (
                <AttachmentItem key={fileUrl} file={file} fileUrl={fileUrl} />
              ))}
            </div>
          ))}
        </Collapse>
      </Scrollbar>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

AttachmentItem.propTypes = {
  file: PropTypes.object,
  fileUrl: PropTypes.string,
};

function AttachmentItem({ file, fileUrl }) {
  return (
    <FileItemStyle key={fileUrl}>
      <FileThumbStyle>{getFileThumb(fileUrl)}</FileThumbStyle>
      <Box sx={{ ml: 1.5, maxWidth: 150 }}>
        <Typography variant="body2" noWrap>
          {getFileFullName(fileUrl)}
        </Typography>
        <Typography noWrap variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {fDateTime(file.createdAt)}
        </Typography>
      </Box>
    </FileItemStyle>
  );
}
