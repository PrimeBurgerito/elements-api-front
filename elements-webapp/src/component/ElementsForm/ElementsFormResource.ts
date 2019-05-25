export interface IElementsFormProps {
  formStructure: IFormStructure;
  onChange: (formState: any) => void;
  label?: string;
}

export enum FormElementType {
  NUMERIC, TEXT, ATTRIBUTE, PROPERTY, TAG,
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

export interface IFormTag extends IFormElement {
  type: FormElementType.TAG;
}

export interface IFormAttribute extends IFormElement {
  type: FormElementType.ATTRIBUTE;
}

export interface IFormProperty extends IFormElement {
  type: FormElementType.PROPERTY;
}


export interface IFormStructure {
  formElements: { [key: string]: IFormProperty | IFormAttribute | IFormText | IFormNumeric | IFormTag };
}
