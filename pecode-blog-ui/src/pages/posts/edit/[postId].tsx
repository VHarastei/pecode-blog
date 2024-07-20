import { api } from '@features/app';
import { MainLayout } from '@layouts';
import { GetStaticProps } from 'next';
import { IPost, IPostForm } from '@types';
import { enqueueSnackbar } from 'notistack';
import { PostForm, usePostForm } from '@features/posts';

import { Stack, Button, Typography } from '@mui/material';

type Props = {
  post: IPost;
};
export default function EditPostPage({ post }: Props) {
  const handleUpdatePost = async (payload: IPostForm) => {
    await api.posts.edit(post.id, payload);
    enqueueSnackbar('Post successfully updated!', { variant: 'success' });
  };

  const { form, isSubmitting, onChangeForm, onSubmitForm, onCancel } = usePostForm({
    initialValue: {
      title: post.title,
      content: post.content,
      author: post.author,
    },
    onSubmit: handleUpdatePost,
  });

  return (
    <MainLayout title="Edit Post">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={2}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h1">Post Edit</Typography>
        <Stack direction="row" gap={2}>
          <Button size="large" variant="outlined" onClick={onCancel} disabled={isSubmitting}>
            Back
          </Button>
          <Button size="large" variant="contained" onClick={onSubmitForm} disabled={isSubmitting}>
            Save
          </Button>
        </Stack>
      </Stack>
      <PostForm form={form} onChangeForm={onChangeForm} disabled={isSubmitting} />
    </MainLayout>
  );
}

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  const post = await api.posts.get(params?.postId as string);

  return {
    props: { post },
  };
};
