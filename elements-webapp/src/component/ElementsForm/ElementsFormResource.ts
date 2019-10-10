export interface IElementsFormProps<T> {
  formStructure: IFormStructure;
  onChange: (formState: T) => void;
  formValue?: any;
  label?: string;
}

export enum FormElementType {
  NUMERIC, TEXT, ATTRIBUTE, PROPERTY, TAG, MULTISELECT, TIMING, REQUIREMENT, LOCATION, ARRAY,
}

export type FormElement<T extends FormElementType> = {
  label: string;
  type: T;
};

export type FormText = FormElement<FormElementType.TEXT>;
export type FormTag = FormElement<FormElementType.TAG>;
export type FormAttribute = FormElement<FormElementType.ATTRIBUTE>;
export type FormProperty = FormElement<FormElementType.PROPERTY>;
export type FormTimingSelect = FormElement<FormElementType.TIMING>;
export type FormRequirement = FormElement<FormElementType.REQUIREMENT>;

export type FormArray = FormElement<FormElementType.ARRAY> & {
  formStructure: IFormStructure;
};

export type FormNumeric = FormElement<FormElementType.NUMERIC> & {
  min?: number;
  max?: number;
};

export type FormLocation = FormElement<FormElementType.LOCATION> & {
  caching?: boolean;
};

export type FormMultiSelect = FormElement<FormElementType.MULTISELECT> & {
  selectableValues?: string[];
};


export type IFormStructure = {
  formElements: {
    [key: string]:
      FormProperty |
      FormAttribute |
      FormText |
      FormNumeric |
      FormTag |
      FormMultiSelect |
      FormTimingSelect |
      FormRequirement |
      FormLocation
  };
};
