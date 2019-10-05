import { IRequirement } from '@type/requirement';

export interface IImage {
  fileName: string;
  key: string;
  uri: string;
  crops?: { [key: string]: IImageCrop };
}

export interface IConditionalImage {
  image?: IImage;
  requirement?: IRequirement;
}

export interface IImageCrop {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface IConditionalImageDto {
  entityId: string;
  imageKey: string;
  requirement?: IRequirement;
  crops?: { [key: string]: IImageCrop };
}

export interface IImageDto {
  entityId: string;
  imageKey: string;
  crops?: { [key: string]: IImageCrop };
}
