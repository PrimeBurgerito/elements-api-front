import { AUTH_URL, BASE_URL } from '@constant/paths';
import axios, { AxiosInstance } from 'axios';
import * as qs from 'qs';
import { SessionUtil } from '@shared/util/SessionUtil';

export const APPLICATION_JSON_OPTION = { type: 'application/json' };

export const API = (): AxiosInstance => {
  const token = SessionUtil.getToken();
  return axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
    headers: { Authorization: `Bearer ${token}` },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
  });
};

export const authAPI = axios.create({
  baseURL: AUTH_URL,
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json',
  }
});
