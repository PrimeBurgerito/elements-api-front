import { TOKEN_STORAGE_KEY } from '@constant/constants';
import { AUTH_POST } from '@shared/api/request-template/authRequest';
import { IAuthTokenRequestBody, IToken } from '@type/token';
import { AxiosResponse } from 'axios';

const AUTH_PATH = '/oauth/token';

export default class AuthApi {
  public static getAuthenticationToken = async (username: string, password: string): Promise<IToken> => {
    const body: IAuthTokenRequestBody = { grant_type: 'password', password, username };
    const response: AxiosResponse = await AUTH_POST(AUTH_PATH, body);
    if (!response) {
      return null;
    }
    const token: IToken = await response.data;
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token.access_token);
    return token;
  }
}
