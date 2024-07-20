export interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export type IPostForm = Pick<IPost, 'title' | 'content' | 'author'>;
