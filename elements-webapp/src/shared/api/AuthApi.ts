import { AUTH_POST } from '@shared/api/request-template/authRequest';
import { IJwt } from '@type/token';
import { AxiosResponse } from 'axios';
import { SessionUtil } from '@shared/util/SessionUtil';


export default class AuthApi {
  public static authenticate = async (username: string, password: string): Promise<Readonly<IJwt>> => {
    const response: AxiosResponse = await AUTH_POST({ password, username });
    if (!response) {
      return null;
    }
    const jwt: IJwt = await response.data;
    SessionUtil.setToken(jwt);
    return jwt;
  };
}
