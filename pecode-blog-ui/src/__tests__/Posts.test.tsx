// import { IPost } from '@types';
// import '@testing-library/jest-dom';
// // import userEvent from '@testing-library/user-event';
// import { render, screen, waitFor } from '@testing-library/react';

// import Posts from '../pages';
// import { api } from '../features/app';

// jest.mock('../features/app');

// describe('Posts', () => {
//   it('renders a list of blog posts', async () => {
//     const posts: IPost[] = [
//       {
//         id: '1',
//         title: 'Post 1',
//         author: 'auth',
//         content: 'Content 1',
//         createdAt: '2024-07-20 15:03:17',
//       },
//       {
//         id: '2',
//         title: 'Post 2',
//         author: 'auth',
//         content: 'Content 2',
//         createdAt: '2024-07-20 15:03:17',
//       },
//     ];

//     (api.posts.list as jest.Mock).mockResolvedValue(posts);

//     render(<Posts posts={posts} />);

//     await waitFor(() => expect(api.posts.list).toHaveBeenCalled());

//     const post1Title = await screen.findByText('Post 1');
//     const post2Title = await screen.findByText('Post 2');

//     expect(post1Title).toBeInTheDocument();
//     expect(post2Title).toBeInTheDocument();
//   });

//   it('navigates to the create post page when the "Create Post" button is clicked', async () => {
//     const pushMock = jest.fn();
//     jest.mock('next/router', () => ({
//       useRouter: () => ({
//         push: pushMock,
//       }),
//     }));

//     render(<Posts posts={[]} />);

//     const createPostButton = screen.getByText('Create Post');
//     userEvent.click(createPostButton);

//     expect(pushMock).toHaveBeenCalledWith('/posts/create');
//   });

//   it('navigates to the edit post page when the "Edit" button is clicked', async () => {
//     const pushMock = jest.fn();
//     jest.mock('next/router', () => ({
//       useRouter: () => ({
//         push: pushMock,
//       }),
//     }));

//     const posts: IPost[] = [
//       {
//         id: '1',
//         title: 'Post 1',
//         author: 'auth',
//         content: 'Content 1',
//         createdAt: '2024-07-20 15:03:17',
//       },
//     ];

//     render(<Posts posts={posts} />);

//     const editPostButton = screen.getByText('Edit');
//     userEvent.click(editPostButton);

//     expect(pushMock).toHaveBeenCalledWith('/posts/edit/1');
//   });

//   it('deletes a post when the "Delete" button is clicked', async () => {
//     const replaceMock = jest.fn();
//     jest.mock('next/router', () => ({
//       useRouter: () => ({
//         replace: replaceMock,
//         asPath: '/posts',
//       }),
//     }));

//     const posts: IPost[] = [
//       {
//         id: '1',
//         title: 'Post 1',
//         author: 'auth',
//         content: 'Content 1',
//         createdAt: '2024-07-20 15:03:17',
//       },
//     ];

//     (api.posts.delete as jest.Mock).mockResolvedValue({});

//     render(<Posts posts={posts} />);

//     const deletePostButton = screen.getByText('Delete');
//     userEvent.click(deletePostButton);

//     await waitFor(() => expect(api.posts.delete).toHaveBeenCalledWith(1));

//     expect(replaceMock).toHaveBeenCalledWith('/posts');
//   });
// });
