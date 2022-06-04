import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import PropTypes from "prop-types";
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import {updateBlog } from "../../../helpers/backend_helper";
import BlogPostCommentList from "./BlogPostCommentList";

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------
BlogPostCommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};
export default function BlogPostCommentForm({ post }) {
  const CommentSchema = Yup.object().shape({
    message: Yup.string().required('Comment is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const defaultValues = {
    message: '',
    name: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid },

  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const comment = getValues();
      console.log("comments---",comment);

      comment.avatarUrl = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/62.jpg"
      comment.postedAt= new Date();
      comment.users=[{
        "id": "43f34f34r3fceewf",
        "name": "Bennie Wuckert",
        "avatarUrl": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1020.jpg"
      }];
      comment.replyComment=[{
        "id": "0x7ac36Dddcc",
        "userId": "43f34f34r3fceewf",
        "message": "Quisquam blanditiis rerum asperiores molestiae ratione.\nSed molestiae tenetur similique dolores reprehenderit ut.\nDistinctio id enim similique cumque illo nostrum.",
        "postedAt": new Date(),
      }];
      console.log("onSubmit____",comment);
      await updateBlog(
          {...post,
            comments:[...post.comments, comment]
          }
      );
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Add Comment
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="message" label="Comment *" multiline rows={3} />

          <RHFTextField name="name" label="Name *" />

          <RHFTextField name="email" label="Email *" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post comment
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyles>
  );
}
