import axios from 'axios';

import { VITE_API_URL } from '@/config/env';

export const apiAxios = axios.create({ baseURL: VITE_API_URL });
