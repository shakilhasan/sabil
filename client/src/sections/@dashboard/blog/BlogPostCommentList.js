import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCommentList({ post }) {
  const { comments } = post;

  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { _id:id, replyComment, users } = comment;
        const hasReply = replyComment.length > 0;

        return (
          <Box key={id} sx={{}}>
            <BlogPostCommentItem
              id={id}
              post={post}
              name={comment.name}
              avatarUrl={comment.avatarUrl}
              postedAt={comment.postedAt}
              message={comment.message}
            />
            {hasReply &&
              replyComment.map((reply) => {
                const user = users.find((user) => user.id === reply.userId);
                return (
                  <BlogPostCommentItem
                    id={id}
                    post={post}
                    key={reply.id}
                    message={reply.message}
                    tagUser={reply.tagUser}
                    postedAt={reply.postedAt}
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}
    </List>
  );
}
