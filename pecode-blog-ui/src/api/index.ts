import PostsAPI from './Posts';
import ApiClient from './ApiClient';

const makeApiList = ({ apiPrefix }: { apiPrefix?: string } = {}) => {
  if (apiPrefix === undefined) {
    throw new Error('[apiPrefix] required');
  }

  const api = new ApiClient({ prefix: apiPrefix });

  return {
    apiClient: api,
    posts: new PostsAPI({ apiClient: api }),
  };
};

export default makeApiList;
