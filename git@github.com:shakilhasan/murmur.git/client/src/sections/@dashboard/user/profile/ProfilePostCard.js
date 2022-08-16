import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import MyAvatar from '../../../../components/MyAvatar';
import EmojiPicker from '../../../../components/EmojiPicker';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object,
};

export default function ProfilePostCard({ post }) {
  const { user } = useAuth();

  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [isLiked, setLiked] = useState(post.isLiked);

  const [likes, setLikes] = useState(post.personLikes.length);

  const [message, setMessage] = useState('');

  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {user?.displayName}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>{post.message}</Typography>

        <Image alt="post media" src={post.media} ratio="16/9" sx={{ borderRadius: 1 }} />

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            {post.personLikes.map((person) => (
              <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </AvatarGroup>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClickComment}>
            <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Iconify icon={'eva:share-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        {hasComments && (
          <Stack spacing={1.5}>
            {post.comments.map((comment) => (
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">{comment.author.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        )}

        <Stack direction="row" alignItems="center">
          <MyAvatar />
          <TextField
            fullWidth
            size="small"
            value={message}
            inputRef={commentInputRef}
            placeholder="Write a comment…"
            onChange={(event) => handleChangeMessage(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClickAttach}>
                    <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
                  </IconButton>
                  <EmojiPicker alignRight value={message} setValue={setMessage} />
                </InputAdornment>
              ),
            }}
            sx={{
              ml: 2,
              mr: 1,
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <IconButton>
            <Iconify icon={'ic:round-send'} width={24} height={24} />
          </IconButton>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </Stack>
      </Stack>
    </Card>
  );
}
