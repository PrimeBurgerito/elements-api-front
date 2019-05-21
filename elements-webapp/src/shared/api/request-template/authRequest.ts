import { authAPI } from '@shared/api/request-template/AxiosInstance';
import { ITokenRequestBody } from '@type/token';
import { AxiosResponse } from 'axios';
import * as qs from 'qs';


export const AUTH_POST = async (path: string, body: ITokenRequestBody): Promise<AxiosResponse> => {
  try {
    return await authAPI.post(path, qs.stringify(body));
  } catch (e) {
    console.log(`authTemplate(): ${e}\n path: ${path}\n body: ${body}`);
    return null;
  }
};
