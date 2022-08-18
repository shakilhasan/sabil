import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Button,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import produce from "immer"
// utils
import { fDate } from '../../../utils/formatTime';
import {updateBlog} from "../../../helpers/backend_helper";

// ----------------------------------------------------------------------

BlogPostCommentItem.propTypes = {
  post: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  tagUser: PropTypes.string,
  postedAt: PropTypes.string,
  hasReply: PropTypes.bool,
};

export default function BlogPostCommentItem({ post, id, name, avatarUrl, message, tagUser, postedAt, hasReply }) {
  const [openReply, setOpenReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const handleOpenReply = () => {
    setOpenReply(true);
  };
    const handleSubmit = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log(id,"-handleSubmit-",post);
            const comments = produce(post.comments, draft => {
                const draftName = draft.find(draftEvent => draftEvent._id === id);
                draftName.replyComment = [
                    ...draftName.replyComment,
                    {
                        userId:"43f34f34r3fceewf",
                        message:replyMessage,
                        postedAt: new Date(),
                    }
                ];
            });
            await updateBlog({...post, comments});
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
          ...(hasReply && {
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                <strong>{tagUser}</strong> {message}
              </Typography>
            </>
          }
        />

        {!hasReply && (
          <Button size="small" onClick={handleOpenReply} sx={{ position: 'absolute', right: 0 }}>
            Reply
          </Button>
        )}
      </ListItem>

      {!hasReply && openReply && (
        <Box
          sx={{
            mb: 3,
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          <TextField
            name="message"
            onChange={(e)=>{setReplyMessage(e.target.value)}}
            fullWidth
            size="small"
            placeholder="Write comment"
            sx={{
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
            <input type="button" value="submit" onClick={handleSubmit}/>
        </Box>
      )}

      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </>
  );
}
