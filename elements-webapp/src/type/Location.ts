import IDocumentBase from '@type/DocumentBase';
import { IConditionalImage } from '@type/image';
import { IRequirement } from '@type/Requirement';

export interface ILocation extends IDocumentBase {
  name: string;
  nearbyLocations: string[];
  images: IConditionalImage[];
  requirement: IRequirement;
}
