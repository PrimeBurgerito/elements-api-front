import BaseApi, { BaseApiMethods } from '@shared/api/BaseApi';
import { ICharacterProperties, ICharacterTemplate, ICharacterTemplateCreate } from '@type/Character';
import { AxiosResponse } from 'axios';
import { GET, POST, PUT } from '@shared/api/request-template/requests';
import { IImage, IImageDto } from '@type/image';

const TEMPLATE_PATH = '/character-template';

export default class CharacterTemplateApi extends BaseApi<any> {
  protected PATH = TEMPLATE_PATH;
}

export class CharacterTemplateV2Api {
  public static getAll = async (): Promise<ReadonlyArray<ICharacterTemplate>> => {
    const response: AxiosResponse<ReadonlyArray<ICharacterTemplate>> = await GET(`${TEMPLATE_PATH}/full`);
    return response.data;
  }

  public static put = async (id: string, body: ICharacterTemplateCreate): Promise<ICharacterTemplateCreate> => {
    const response: AxiosResponse<ICharacterTemplateCreate> = await PUT(`${TEMPLATE_PATH}/${id}`, body);
    return await response ? response.data : null;
  };

  public static create = async (body: ICharacterTemplateCreate): Promise<ICharacterProperties> => {
    const response: AxiosResponse<ICharacterProperties> = await POST(TEMPLATE_PATH, body);
    return await response ? response.data : null;
  }

  public static putImage = async (imageDto: IImageDto, imageFile: File): Promise<IImage> => {
    return await BaseApiMethods.putImage(imageDto, imageFile, TEMPLATE_PATH) as IImage;
  }

  public static removeImage = async (id: string, imageKey: string): Promise<boolean> => {
    return await BaseApiMethods.removeImage(id, imageKey, TEMPLATE_PATH);
  }
}
