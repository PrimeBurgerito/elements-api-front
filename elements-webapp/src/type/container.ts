import { IImage, IImageDto } from '@type/image';
import { IRealmDocument, IRealmDocumentDto } from '@type/Realm';

export interface IImageContainer extends IRealmDocument {
  key: string;
  images: IImage[];
}

export interface IImageContainerDto extends IRealmDocumentDto {
  key: string;
  images: IImageDto[];
}

export interface IKeyContainer extends IRealmDocument {
  key: string;
  images: IImage[];
}

export interface IKeyContainerDto extends IRealmDocumentDto {
  key: string;
  images: IKey[];
}

export interface IKey {
  value: string;
  required: boolean;
}
