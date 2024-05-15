import { apiAxios } from '@/libs/axios';

enum URLS {
  FIND_ALL = '/users',
}

export const usersApi = {
  async findAll() {
    return apiAxios.get(URLS.FIND_ALL);
  },
};
