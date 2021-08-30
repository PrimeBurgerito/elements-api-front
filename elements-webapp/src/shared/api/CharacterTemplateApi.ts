import { BaseApiMethods } from '@shared/api/BaseApi';
import { ICharacterTemplate, ICharacterTemplateCreate } from '@type/Character';
import { IImage, IImageDto } from '@type/image';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';

const TEMPLATE_PATH = '/character-template';

export class CharacterTemplateImageApi {
  public static putImage = async (imageDto: IImageDto, imageFile: File): Promise<IImage> => {
    return await BaseApiMethods.putImage(imageDto, imageFile, TEMPLATE_PATH) as IImage;
  }

  public static removeImage = async (id: string, imageKey: string): Promise<boolean> => {
    return await BaseApiMethods.removeImage(id, imageKey, TEMPLATE_PATH);
  }
}

export const characterTemplateRealmApi = new RealmDocumentApi<ICharacterTemplateCreate, ICharacterTemplate>(TEMPLATE_PATH);
