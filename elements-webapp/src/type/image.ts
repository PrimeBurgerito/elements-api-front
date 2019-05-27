import { IRequirement } from '@type/requirement';

export interface IImage {
  fileName: string;
  key: string;
  uri: string;
}

export interface IConditionalImage {
  image: IImage;
  requirement: IRequirement;
}
