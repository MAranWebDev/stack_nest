import { axiosApi } from '@/libs/axios';

interface RegisterBodyType extends LoginBodyType {
  name: string;
}

interface LoginBodyType {
  email: string;
  password: string;
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

    // if (response.data) localStorage.setItem('jwt', JSON.stringify(response.data));
  },
  logout() {
    localStorage.removeItem(LOCAL_STORAGE.JWT);
    localStorage.removeItem(LOCAL_STORAGE.USER);
  },
};
