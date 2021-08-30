import { IRealmDocument, IRealmDocumentDto } from '@type/Realm';
import { DELETE, GET, POST, PUT } from '@shared/api/request-template/requests';
import { SessionUtil } from '@shared/util/SessionUtil';
import { IConditionalImage, IConditionalImageDto, IImageDto } from '@type/image';
import { AxiosResponse } from 'axios';
import { APPLICATION_JSON_OPTION } from '@shared/api/request-template/AxiosInstance';

const REALM_ERROR = 'No realm in session!';
const FORM_DATA_FILE = 'file';
const FORM_DATA_IMAGE_DTO = 'imageDto';

export default class RealmDocumentApi<D extends IRealmDocumentDto = IRealmDocumentDto, T extends IRealmDocument = IRealmDocument> {
  constructor(private path: string) {
  }

  public get = async (id: string): Promise<T> => {
    const response = await GET<T>(`${this.path}/${id}`);
    return response ? response.data : null;
  }

  public post = async (dto: D): Promise<T> => {
    const success = this.setRealmId(dto);
    if (!success) return Promise.reject<T>(REALM_ERROR);
    const response = await POST<T>(this.path, dto);
    return response ? response.data : null;
  };

  public put = async (id: string, dto: D): Promise<D> => {
    const success = this.setRealmId(dto);
    if (!success) return Promise.reject<D>(REALM_ERROR);
    const response = await PUT<D>(`${this.path}/${id}`, dto);
    return response ? response.data : null;
  };

  public find = async (): Promise<ReadonlyArray<T>> => {
    const sessionRealm = SessionUtil.getRealm();
    if (!sessionRealm?.id) {
      return Promise.reject<ReadonlyArray<T>>(REALM_ERROR);
    }
    const response = await GET<ReadonlyArray<T>>(this.path, { params: { realmId: sessionRealm.id } });
    return response ? response.data : null;
  };

  public delete = async (id: string): Promise<boolean> => {
    const response = await DELETE<boolean>(`${this.path}/${id}`);
    return response ? response.data : null;
  };

  private setRealmId(dto: D): boolean {
    const sessionRealm = SessionUtil.getRealm();
    if (!sessionRealm?.id) {
      return false;
    }
    dto.realmId = sessionRealm.id;
    return true;
  }

  public putConditionalImage = async (conditionalImageDto: IConditionalImageDto, imageFile: File): Promise<IConditionalImage> => {
    const formData = this.getImageForm(conditionalImageDto, imageFile);
    const response: AxiosResponse<IConditionalImage> = await PUT(`${this.path}/image`, formData, { headers: { 'Content-Type': undefined } });
    return await response ? response.data : null;
  };

  public putImage = async (imageDto: IImageDto, imageFile: File): Promise<any> => {
    const formData = this.getImageForm(imageDto, imageFile);
    const response: AxiosResponse = await PUT(`${this.path}/image`, formData, { headers: { 'Content-Type': undefined } });
    return await response ? response.data : null;
  };

  private getImageForm = (dto: object, file: File): FormData => {
    const formData = new FormData();
    formData.append(FORM_DATA_FILE, file);
    formData.append(FORM_DATA_IMAGE_DTO, new Blob([JSON.stringify(dto)], APPLICATION_JSON_OPTION));
    return formData;
  };
}
