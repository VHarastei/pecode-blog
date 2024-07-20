import apiFactory from 'src/api';

export const api = apiFactory({ apiPrefix: process.env.NEXT_PUBLIC_API_PREFIX });
