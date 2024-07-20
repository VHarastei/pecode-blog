import dayjs from 'dayjs';
import { IPost } from '@types';

export interface IPostDump {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export function dumpPost(post: IPostDump): IPost {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    createdAt: dayjs(post.createdAt).format('DD/MM/YYYY'),
  };
}
