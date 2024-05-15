import { apiAxios } from '@/libs/axios';

interface RegisterBodyType {
  name: string;
  email: string;
  password: string;
}

enum URLS {
  REGISTER = '/auth/register',
  LOGIN = '/auth/login',
}

export const authApi = {
  async register(registerBody: RegisterBodyType) {
    return apiAxios.post(URLS.REGISTER, registerBody);
  },
};
