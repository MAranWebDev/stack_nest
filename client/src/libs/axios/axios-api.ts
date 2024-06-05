import axios from 'axios';

import { VITE_API_URL } from '@/config/env';

export const axiosApi = axios.create({ baseURL: VITE_API_URL });

export const axiosApiPrivate = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // ojo con esto
  headers: { 'Content-Type': 'application/json' },
});
