import { IImage } from '@type/image';
import { INumericProperty, IStringProperty } from '@type/statistics';
import IDocumentBase from '@type/DocumentBase';

export interface ICharacterProperties {
  numericProperties: ReadonlyArray<INumericProperty>;
  stringProperty: ReadonlyArray<IStringProperty>;
  numericPropertyKeyToValue: Record<string, number>;
  stringPropertyKeyToValue: Record<string, string[]>;
}

export interface ICharacterTemplate extends IDocumentBase {
  images: Record<string, IImage>;
  properties: ICharacterProperties;
}

export interface ICharacterTemplateCreate {
  stringProperties: Record<string, string[]>;
  numericProperties: Record<string, number>;
}
