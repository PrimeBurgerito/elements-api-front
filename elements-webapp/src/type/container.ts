import IDocumentBase from '@type/DocumentBase';
import { IImage, IImageDto } from '@type/image';

export interface IImageContainer extends IDocumentBase {
  key: string;
  images: IImage[];
}

export interface IImageContainerDto {
  key: string;
  images: IImageDto[];
}

export interface IKeyContainer extends IDocumentBase {
  key: string;
  images: IImage[];
}

export interface IKeyContainerDto {
  key: string;
  images: IKey[];
}

export interface IKey {
  value: string;
  required: boolean;
}
