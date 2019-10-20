import { IUser } from '@type/user';
import { AxiosResponse } from 'axios';
import { GET, POST } from './request-template/requests';

const CURRENT_USER_PATH = '/user/me';
const USER_REFRESH_TOKEN = '/auth/refresh-token';

export default class UserApi {
  public static getCurrentUser = async (): Promise<IUser> => {
    const response: AxiosResponse = await GET(CURRENT_USER_PATH, {});
    if (!response) {
      return null;
    }
    return await response.data;
  };

  public static getRefreshToken = async (): Promise<string> => {
    const response: AxiosResponse = await GET(USER_REFRESH_TOKEN);
    return await response ? response.data : null;
  };

  public static saveRefreshTokenToDb = async (refreshToken: string, authToken?: string): Promise<boolean> => {
    const response: AxiosResponse = await POST(`${USER_REFRESH_TOKEN}/${refreshToken}`, authToken);
    return response.status === 200;
  };
}
