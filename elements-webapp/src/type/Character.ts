import { IImage } from '@type/image';
import { INumericProperty, IStringProperty } from '@type/statistics';
import { IRealmDocument, IRealmDocumentDto } from '@type/Realm';

export interface ICharacterProperties {
  numericProperties: ReadonlyArray<INumericProperty>;
  stringProperty: ReadonlyArray<IStringProperty>;
  numericPropertyKeyToValue: Record<string, number>;
  stringPropertyKeyToValue: Record<string, string[]>;
}

export interface ICharacterTemplate extends IRealmDocument {
  images: Record<string, IImage>;
  properties: ICharacterProperties;
}

export interface ICharacterTemplateCreate extends IRealmDocumentDto {
  stringProperties: Record<string, string[]>;
  numericProperties: Record<string, number>;
}
