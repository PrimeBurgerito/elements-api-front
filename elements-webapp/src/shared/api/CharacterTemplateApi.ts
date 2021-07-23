import BaseApi from '@shared/api/BaseApi';
import { ICharacterTemplate, ICharacterTemplateCreate } from '@type/Character';
import { AxiosResponse } from 'axios';
import { GET, PUT } from '@shared/api/request-template/requests';

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
}
