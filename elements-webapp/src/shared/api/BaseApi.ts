import { DELETE, GET, POST, PUT } from '@shared/api/request-template/requests';
import { AxiosResponse } from 'axios';

export default abstract class BaseApi {

  protected abstract GET_PATH: string;

  public get = async (id: string): Promise<any> => {
    const response: AxiosResponse = await GET(`${this.GET_PATH}/${id}`);
    return await response ? response.data : null;
  }

  public post = async (body: any): Promise<any> => {
    const response: AxiosResponse = await POST(this.GET_PATH, body);
    return await response ? response.data : null;
  }

  public put = async (body: any): Promise<any> => {
    const response: AxiosResponse = await PUT(this.GET_PATH, body);
    return await response ? response.data : null;
  }
  public find = async (): Promise<any> => {
    const response: AxiosResponse = await GET(this.GET_PATH);
    return await response ? response.data : null;
  }
  public delete = async (id: string): Promise<any> => {
    const response: AxiosResponse = await DELETE(`${this.GET_PATH}/${id}`);
    return await response ? response.data : null;
  }
}
