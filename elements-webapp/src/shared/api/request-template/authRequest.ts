import { authAPI } from '@shared/api/request-template/AxiosInstance';
import { IAuthenticationRequest } from '@type/token';
import { AxiosResponse } from 'axios';


export const AUTH_POST = async (body: IAuthenticationRequest): Promise<AxiosResponse> => {
  try {
    return await authAPI.post('', body);
  } catch (e) {
    console.error(`authTemplate(): ${e}\n body: ${body}`);
    return null;
  }
};
