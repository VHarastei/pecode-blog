import { IPost } from '@types';
import { api } from '@features/app';
import { MainLayout } from '@layouts';
import { Post } from '@features/posts';
import { useRouter } from 'next/router';
import { ROUTES } from '@constants/routes';
import { enqueueSnackbar } from 'notistack';

import { Stack, Button, Typography } from '@mui/material';

type Props = {
  posts: IPost[];
};

export default function Posts({ posts }: Props) {
  const router = useRouter();

  const handleCreate = () => {
    router.push(ROUTES.CREATE_POST);
  };

  const handleEdit = (id: string) => {
    router.push(`${ROUTES.EDIT_POST}${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.posts.delete(id);
      router.replace(router.asPath);
    } catch (err) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  return (
    <MainLayout title="Posts">
      <Stack direction="row" gap={2} justifyContent="space-between">
        <Typography variant="h1" gutterBottom>
          Blog Posts
        </Typography>
        <Button size="large" variant="contained" sx={{ mb: 2 }} onClick={handleCreate}>
          Create Post
        </Button>
      </Stack>
      <Stack gap={2}>
        {posts.map((post) => (
          <Post key={post.id} post={post} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </Stack>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  const posts = await api.posts.list();

  return {
    props: { posts },
  };
};
