import IDocumentBase from '@type/DocumentBase';

export interface IProperty<T> extends IDocumentBase {
  name: string;
  key: string;
  value: T;
}

export interface INumericProperty extends IProperty<number> {
  min: number;
  max: number;
}

export interface IStringProperty extends IProperty<string[]> {
  possibleValues: string[];
  type: StringPropertyType;
}

export interface IObjective extends IDocumentBase {
  value: string;
}

export enum StringPropertyType {
  SINGLE, UNIQUE, MULTIPLE
}
