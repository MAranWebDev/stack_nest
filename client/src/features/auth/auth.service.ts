import { isAxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { axiosApi } from '@/libs/axios';

import { LOCAL_STORAGE } from './constants';
import { DecodedJwtType, LoginInputsType, RegisterBodyType } from './types';

const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
} as const;

const helpers = {
  _handleJwt(jwt: string) {
    const decodedJwt: DecodedJwtType = jwtDecode(jwt);
    localStorage.setItem(LOCAL_STORAGE.JWT, jwt);
    localStorage.setItem(LOCAL_STORAGE.USER, decodedJwt.name);
    localStorage.setItem(LOCAL_STORAGE.ROLE, decodedJwt.role);

    return { ...decodedJwt, token: jwt };
  },

  _handleErrorResponse(error: unknown) {
    if (!isAxiosError(error)) return new Error('Something went wrong!');
    if (error.response) return new Error(error.response.data.message);
    return new Error(error.message);
  },
};

export const authService = {
  async register(registerBody: RegisterBodyType) {
    try {
      const { data } = await axiosApi.post(ENDPOINTS.REGISTER, registerBody);
      const { token } = data;
      if (token) return helpers._handleJwt(token);
      throw Error();
    } catch (error) {
      throw helpers._handleErrorResponse(error);
    }
  },

  async login(loginBody: LoginInputsType) {
    try {
      const { data } = await axiosApi.post(ENDPOINTS.LOGIN, loginBody);
      const { token } = data;
      if (token) return helpers._handleJwt(token);
      throw Error();
    } catch (error) {
      throw helpers._handleErrorResponse(error);
    }
  },

  logout() {
    const localStorageKeysArray = Object.values(LOCAL_STORAGE);
    localStorageKeysArray.forEach((key) => localStorage.removeItem(key));
  },
};
