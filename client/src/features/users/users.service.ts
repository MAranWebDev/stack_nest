import { axiosApiPrivate } from '@/libs/axios';

enum URLS {
  FIND_ALL = '/users',
}

export const usersService = {
  async findAll() {
    return axiosApiPrivate.get(URLS.FIND_ALL);
  },
};
