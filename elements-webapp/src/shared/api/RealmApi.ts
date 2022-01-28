import { AxiosResponse } from 'axios';
import { GET, POST } from '@shared/api/request-template/requests';
import { IRealm, IRealmDto } from '@type/Realm';

const PATH = '/realm';

export default class RealmApi {
  public static get = async (id: string): Promise<IRealm> => {
    const response: AxiosResponse<IRealm> = await GET(`${PATH}/${id}`);
    return await response ? response.data : null;
  };

  public static post = async (body: IRealmDto): Promise<IRealm> => {
    const response: AxiosResponse<IRealm> = await POST(PATH, body);
    return await response ? response.data : null;
  };

  public static find = async (useCache?: boolean): Promise<IRealm[]> => {
    if (useCache) {
      const cacheItem = JSON.parse(sessionStorage.getItem(`${PATH}-FIND`)) as IRealm[];
      if (cacheItem) {
        return Promise.resolve(cacheItem);
      }
    }
    const response: AxiosResponse<IRealm[]> = await GET(PATH);
    if (response.data) {
      sessionStorage.setItem(`${PATH}-FIND`, JSON.stringify(response.data));
    }
    return await response ? response.data : null;
  };

  public static getMine = async (): Promise<IRealm[]> => {
    const response: AxiosResponse<IRealm[]> = await GET(`${PATH}/owned`);
    return await response ? response.data : null;
  }
}
