export interface IElementsFormProps<T extends object = object> {
  formStructure: IFormStructure<T>;
  onChange: (formState: T) => void;
  formValue?: any;
  label?: string;
}

export enum FormElementType {
  NUMERIC, TEXT, NUMERIC_PROPERTY, STRING_PROPERTY, TAG, MULTI_SELECT, TIMING, REQUIREMENT, LOCATION, ARRAY, BOOLEAN, REWARD, NESTED
}

export type FormElement<T extends FormElementType> = {
  label: string;
  type: T;
};

export type FormText = FormElement<FormElementType.TEXT>;
export type FormTag = FormElement<FormElementType.TAG>;
export type FormNumericProperty = FormElement<FormElementType.NUMERIC_PROPERTY>;
export type FormStringProperty = FormElement<FormElementType.STRING_PROPERTY>;
export type FormTimingSelect = FormElement<FormElementType.TIMING>;
export type FormRequirement = FormElement<FormElementType.REQUIREMENT>;
export type FormBoolean = FormElement<FormElementType.BOOLEAN>;
export type FormReward = FormElement<FormElementType.REWARD>;

export type FormArray = FormElement<FormElementType.ARRAY> & {
  formStructure?: IFormStructure;
};

export type FormNested<T extends object = object> =
  FormElement<FormElementType.NESTED>
  & Pick<IElementsFormProps<T>, 'formStructure' | 'label'>;

export type FormNumeric = FormElement<FormElementType.NUMERIC> & {
  min?: number;
  max?: number;
};

export type FormLocation = FormElement<FormElementType.LOCATION> & {
  caching?: boolean;
};

export type FormMultiSelect = FormElement<FormElementType.MULTI_SELECT> & {
  selectableValues?: string[];
};


export type IFormStructure<Entity extends object = object> = {
  formElements: Record<keyof Entity,
    | FormStringProperty
    | FormNumericProperty
    | FormText
    | FormNumeric
    | FormTag
    | FormMultiSelect
    | FormTimingSelect
    | FormRequirement
    | FormLocation
    | FormArray
    | FormBoolean
    | FormReward
    | FormNested>
};

