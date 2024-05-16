import { axiosApi } from '@/libs/axios';

interface LoginBodyType {
  email: string;
  password: string;
}

interface RegisterBodyType extends LoginBodyType {
  name: string;
}

enum URLS {
  REGISTER = '/auth/register',
  LOGIN = '/auth/login',
}

enum LOCAL_STORAGE {
  JWT = 'jwt',
  USER = 'user',
}

export const authService = {
  async register(registerBody: RegisterBodyType) {
    return axiosApi.post(URLS.REGISTER, registerBody);
  },
  async login(loginBody: LoginBodyType) {
    return axiosApi.post(URLS.LOGIN, loginBody);
  },
  logout() {
    localStorage.removeItem(LOCAL_STORAGE.JWT);
    localStorage.removeItem(LOCAL_STORAGE.USER);
  },
};
