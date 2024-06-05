import { axiosApiPrivate } from '@/libs/axios';

const URLS = {
  FIND_ALL: '/users',
} as const;

export const usersService = {
  async findAll() {
    return axiosApiPrivate.get(URLS.FIND_ALL);
  },
};
