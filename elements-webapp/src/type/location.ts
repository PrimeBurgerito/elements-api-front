import DocumentBase from '@type/DocumentBase';
import { IConditionalImage } from '@type/image';
import { IRequirement } from '@type/requirement';

export interface ILocation extends DocumentBase {
  name: string;
  nearbyLocations: string[];
  images: IConditionalImage[];
  requirement: IRequirement;
}
