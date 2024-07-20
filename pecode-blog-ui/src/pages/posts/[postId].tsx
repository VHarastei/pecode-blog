import { IPost } from '@types';
import { api } from '@features/app';
import { MainLayout } from '@layouts';
import { GetStaticProps } from 'next';
import { Post } from '@features/posts';
import { useRouter } from 'next/router';
import { ROUTES } from '@constants/routes';
import { enqueueSnackbar } from 'notistack';

import { Button } from '@mui/material';

type Props = {
  post: IPost;
};

export default function PostPage({ post }: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.push(ROUTES.POSTS);
  };

  const handleEdit = (id: string) => {
    router.push(`${ROUTES.EDIT_POST}${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.posts.delete(id);
    } catch (err) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  return (
    <MainLayout title="Posts">
      <Button size="large" variant="contained" sx={{ mb: 2 }} onClick={handleBack}>
        Back
      </Button>
      <Post post={post} isDetailed onEdit={handleEdit} onDelete={handleDelete} />
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await api.posts.get(params?.postId as string);

  return {
    props: { post },
  };
};

export async function getStaticPaths() {
  const posts = await api.posts.list();

  const paths = posts.map((post) => ({
    params: { postId: post.id },
  }));

  return { paths, fallback: 'blocking' };
}
