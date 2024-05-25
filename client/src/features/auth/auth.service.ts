import { isAxiosError } from 'axios';

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
    try {
      const { data } = await axiosApi.post(URLS.REGISTER, registerBody);
      if (data.token) localStorage.setItem(LOCAL_STORAGE.JWT, JSON.stringify(data.token));
      return data;
    } catch (error) {
      if (!isAxiosError(error)) throw new Error('Something went wrong!');
      if (error.response) throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  },
  async login(loginBody: LoginBodyType) {
    return axiosApi.post(URLS.LOGIN, loginBody);
  },
  logout() {
    localStorage.removeItem(LOCAL_STORAGE.JWT);
    localStorage.removeItem(LOCAL_STORAGE.USER);
  },
};
