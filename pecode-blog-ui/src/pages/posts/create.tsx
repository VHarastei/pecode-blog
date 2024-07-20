import { IPostForm } from '@types';
import { api } from '@features/app';
import { MainLayout } from '@layouts';
import { enqueueSnackbar } from 'notistack';
import { PostForm, usePostForm } from '@features/posts';

import { Stack, Button, Typography } from '@mui/material';

const initialValue = {
  title: '',
  content: '',
  author: '',
};

export default function CreatePostPage() {
  const handleCreatePost = async (payload: IPostForm) => {
    await api.posts.create(payload);
    onResetForm();
    enqueueSnackbar('Post successfully created!', { variant: 'success' });
  };

  const { form, isSubmitting, onChangeForm, onSubmitForm, onResetForm, onCancel } = usePostForm({
    initialValue,
    onSubmit: handleCreatePost,
  });

  return (
    <MainLayout title="Create Post">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={2}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h1">Post Creation</Typography>
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

export async function getStaticProps() {
  const posts = await api.posts.list();

  return {
    props: { posts },
  };
}
