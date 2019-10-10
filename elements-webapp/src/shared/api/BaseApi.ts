import { APPLICATION_JSON_OPTION } from '@shared/api/request-template/AxiosInstance';
import { DELETE, GET, POST, PUT } from '@shared/api/request-template/requests';
import { IConditionalImageDto, IImageDto } from '@type/image';
import { AxiosResponse } from 'axios';

const FORM_DATA_FILE = 'file';
const FORM_DATA_IMAGE_DTO = 'imageDto';

export default abstract class BaseApi<T> {

  protected abstract PATH: string;

  public get = async (id: string): Promise<T> => {
    const response: AxiosResponse = await GET(`${this.PATH}/${id}`);
    return await response ? response.data : null;
  }
  public post = async (body: any): Promise<T> => {
    const response: AxiosResponse = await POST(this.PATH, body);
    return await response ? response.data : null;
  }
  public put = async (body: any): Promise<T> => {
    const response: AxiosResponse = await PUT(this.PATH, body);
    return await response ? response.data : null;
  }
  public putConditionalImage = async (conditionalImageDto: IConditionalImageDto, imageFile: File): Promise<any> => {
    const formData = this.getImageForm(conditionalImageDto, imageFile);
    const response: AxiosResponse = await PUT(`${this.PATH}/image`, formData,
      {headers: {'Content-Type': undefined}});
    return await response ? response.data : null;
  }
  public putImage = async (imageDto: IImageDto, imageFile: File): Promise<any> => {
    const formData = this.getImageForm(imageDto, imageFile);
    const response: AxiosResponse = await PUT(`${this.PATH}/image`, formData,
      {headers: {'Content-Type': undefined}});
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
  public delete = async (id: string): Promise<boolean> => {
    const response: AxiosResponse = await DELETE(`${this.PATH}/${id}`);
    return await response ? response.data : null;
  }

  private getImageForm = (dto: object, file: File): FormData => {
    const formData = new FormData();
    formData.append(FORM_DATA_FILE, file);
    formData.append(FORM_DATA_IMAGE_DTO, new Blob([JSON.stringify(dto)], APPLICATION_JSON_OPTION));
    return formData;
  }
}
