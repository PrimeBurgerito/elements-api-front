import { IRealmDocument } from '@type/Realm';

export interface IProperty<T> extends Partial<IRealmDocument> {
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

export interface IObjective extends Partial<IRealmDocument> {
  value: string;
}

export enum StringPropertyType {
  SINGLE = 'SINGLE', UNIQUE = 'UNIQUE', MULTIPLE = 'MULTIPLE'
}
