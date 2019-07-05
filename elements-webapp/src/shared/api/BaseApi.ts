import { DELETE, GET, POST, PUT } from '@shared/api/request-template/requests';
import { AxiosResponse } from 'axios';

export default abstract class BaseApi<T> {

  protected abstract PATH: string;

  public get = async (id: string): Promise<any> => {
    const response: AxiosResponse = await GET(`${this.PATH}/${id}`);
    return await response ? response.data : null;
  }
  public post = async (body: any): Promise<any> => {
    const response: AxiosResponse = await POST(this.PATH, body);
    return await response ? response.data : null;
  }
  public put = async (body: any): Promise<any> => {
    const response: AxiosResponse = await PUT(this.PATH, body);
    return await response ? response.data : null;
  }
  public putConditionalImage = async (body: FormData): Promise<any> => {
    const response: AxiosResponse = await PUT(`${this.PATH}/image`, body,
      { headers: { 'Content-Type': undefined } });
    return await response ? response.data : null;
  }
  public putImage = async (entityId: string, imageKey: string, body: FormData): Promise<any> => {
    const response: AxiosResponse = await PUT(`${this.PATH}/image/${entityId}/${imageKey}`, body);
    return await response ? response.data : null;
  }
  public find = async (useCache?: boolean): Promise<T[]> => {
    if (useCache) {
      const cacheItem = JSON.parse(sessionStorage.getItem(`${this.PATH}-FIND`)) as T[];
      if (cacheItem) {
        return Promise.resolve(cacheItem);
      }
    }
    const response: AxiosResponse = await GET(this.PATH);
    if (response.data) {
      sessionStorage.setItem(`${this.PATH}-FIND`, JSON.stringify(response.data));
    }
    return await response ? response.data : null;
  }
  public delete = async (id: string): Promise<any> => {
    const response: AxiosResponse = await DELETE(`${this.PATH}/${id}`);
    return await response ? response.data : null;
  }
}
