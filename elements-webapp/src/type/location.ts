import IDocumentBase from '@type/DocumentBase.js';
import { IConditionalImage } from '@type/image';
import { IRequirement } from '@type/requirement';

export interface ILocation extends IDocumentBase {
  name: string;
  nearbyLocations: string[];
  images: IConditionalImage[];
  requirement: IRequirement;
}
