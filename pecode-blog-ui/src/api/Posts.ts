import { IPost, IPostForm } from '@types';
import { dumpPost } from '@utils/dumpPost';

import Base from './Base';

class Posts extends Base {
  list = async (): Promise<IPost[]> => {
    const data = await this.apiClient.get('posts');

    return data.map(dumpPost);
  };

  get = async (id: string): Promise<IPost> => {
    const data = await this.apiClient.get(`posts/${id}`);

    return dumpPost(data);
  };

  create = async (payload: IPostForm): Promise<IPost> => {
    const data = await this.apiClient.post(`posts`, payload);

    return dumpPost(data);
  };

  edit = async (id: string, payload: IPostForm): Promise<IPost> => {
    const data = await this.apiClient.patch(`posts/${id}`, payload);

    return dumpPost(data);
  };

  delete = async (id: string): Promise<IPost> => {
    const data = await this.apiClient.delete(`posts/${id}`);

    return dumpPost(data);
  };

  // ask = async (payload: any) => {
  //   const data = await handleRequest(
  //     this.apiClient.post('documents/ask', { data: { ...payload } })
  //   );

  //   return data;
  // };

  // summary = async (payload: any) => {
  //   const data = await handleRequest(
  //     this.apiClient.post('documents/summary', { data: { ...payload } })
  //   );

  //   return data;
  // };

  // upload = async (file: File) => {
  //   const formData = createFormData({
  //     file,
  //   });

  //   const data = await handleRequest(this.apiClient.postFormData('documents', formData));

  //   return data;
  // };
}

export default Posts;
