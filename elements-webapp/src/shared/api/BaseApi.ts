import { DELETE, GET, POST, PUT } from '@shared/api/request-template/requests';
import { AxiosResponse } from 'axios';

export default abstract class BaseApi {

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
  public find = async (): Promise<any> => {
    const response: AxiosResponse = await GET(this.PATH);
    return await response ? response.data : null;
  }
  public delete = async (id: string): Promise<any> => {
    const response: AxiosResponse = await DELETE(`${this.PATH}/${id}`);
    return await response ? response.data : null;
  }
}
