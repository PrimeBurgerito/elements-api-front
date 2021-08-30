import { IConditionalImage } from '@type/image';
import { IRequirement } from '@type/Requirement';
import { IRealmDocument, IRealmDocumentDto } from '@type/Realm';

export interface ILocation extends IRealmDocument {
  name: string;
  nearbyLocations: string[];
  images: IConditionalImage[];
  requirement: IRequirement;
}

export interface ILocationCreate extends IRealmDocumentDto {
  name?: string;
  nearbyLocations: string[];
}
