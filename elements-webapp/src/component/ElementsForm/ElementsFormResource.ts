import { IAttribute, IProperty } from '@type/statistics';

export interface IElementsFormProps {
  formStructure: IFormStructure;
  label: string;
}

export enum FormElementType {
  NUMERIC, TEXT, ATTRIBUTE, PROPERTY,
}

export interface IFormElement {
  label: string;
  type: FormElementType;
}

export interface IFormNumeric extends IFormElement {
  type: FormElementType.NUMERIC;
  min?: number;
  max?: number;
}

export interface IFormText extends IFormElement {
  type: FormElementType.TEXT;
}

export interface IFormAttribute extends IFormElement {
  type: FormElementType.ATTRIBUTE;
  attributes: IAttribute[];
}

export interface IFormProperty extends IFormElement {
  type: FormElementType.PROPERTY;
  properties: IProperty[];
}


export interface IFormStructure {
  formElements: { [key: string]: IFormProperty | IFormAttribute | IFormText | IFormNumeric };
}
