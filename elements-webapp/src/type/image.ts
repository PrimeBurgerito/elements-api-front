import { IRequirement } from '@type/Requirement';

export interface IImage {
  fileName: string;
  key: string;
  uri: string;
  crops?: Record<string, IImageCrop>;
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
  crops?: Record<string, IImageCrop>;
}

export interface IImageDto {
  entityId: string;
  imageKey: string;
  crops?: Record<string, IImageCrop>;
}
