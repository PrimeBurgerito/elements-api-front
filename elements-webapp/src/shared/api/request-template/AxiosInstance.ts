import { CLIENT_ID, CLIENT_SECRET, TOKEN_STORAGE_KEY } from '@constant/constants';
import { AUTH_URL, BASE_URL } from '@constant/paths';
import axios, { AxiosInstance } from 'axios';
import * as qs from 'qs';

export const APPLICATION_JSON_OPTION = { type: 'application/json' };

export const API = (): AxiosInstance => {
  const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
  return axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
    headers: { Authorization: `Bearer ${token}` },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
  });
};

export const authAPI = axios.create({
  baseURL: AUTH_URL,
  timeout: 50000,
  auth: { username: CLIENT_ID, password: CLIENT_SECRET },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
