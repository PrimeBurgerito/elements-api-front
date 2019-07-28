export interface IElementsFormProps {
  formStructure: IFormStructure;
  onChange: (formState: any) => void;
  formValue?: any;
  label?: string;
}

export enum FormElementType {
  NUMERIC, TEXT, ATTRIBUTE, PROPERTY, TAG, MULTISELECT, TIMING, REQUIREMENT, LOCATION,
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

export interface IFormLocation extends IFormElement {
  type: FormElementType.LOCATION;
  caching?: boolean;
}

export interface IFormMultiSelect extends IFormElement {
  type: FormElementType.MULTISELECT;
  selectableValues: string[];
}

export interface IFormTimingSelect extends IFormElement {
  type: FormElementType.TIMING;
}

export interface IFormRequirement extends IFormElement {
  type: FormElementType.REQUIREMENT;
}


export interface IFormStructure {
  formElements: {
    [key: string]:
      IFormProperty |
      IFormAttribute |
      IFormText |
      IFormNumeric |
      IFormTag |
      IFormMultiSelect |
      IFormTimingSelect |
      IFormRequirement |
      IFormLocation
  };
}
