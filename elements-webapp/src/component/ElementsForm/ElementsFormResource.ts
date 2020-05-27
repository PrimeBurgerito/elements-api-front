export interface IElementsFormProps<T extends object = object> {
  formStructure: IFormStructure<T>;
  onChange: (formState: T) => void;
  formValue?: any;
  label?: string;
}

export enum FormElementType {
  NUMERIC,
  TEXT,
  NUMERIC_PROPERTY,
  STRING_PROPERTY,
  TAG,
  MULTI_SELECT,
  SELECT,
  TIMING,
  REQUIREMENT,
  LOCATION,
  ARRAY,
  BOOLEAN,
  REWARD,
  NESTED
}

export type FormComponentBaseProps<T extends FormElementType> = {
  label: string;
  type: T;
};

export type FormText = FormComponentBaseProps<FormElementType.TEXT>;
export type FormTag = FormComponentBaseProps<FormElementType.TAG>;
export type FormNumericProperty = FormComponentBaseProps<FormElementType.NUMERIC_PROPERTY>;
export type FormStringProperty = FormComponentBaseProps<FormElementType.STRING_PROPERTY>;
export type FormTimingSelect = FormComponentBaseProps<FormElementType.TIMING>;
export type FormRequirement = FormComponentBaseProps<FormElementType.REQUIREMENT>;
export type FormBoolean = FormComponentBaseProps<FormElementType.BOOLEAN>;
export type FormReward = FormComponentBaseProps<FormElementType.REWARD>;

export type FormArray = FormComponentBaseProps<FormElementType.ARRAY> & {
  formStructure?: IFormStructure;
};

export type FormNested<T extends object = object> =
  FormComponentBaseProps<FormElementType.NESTED>
  & Pick<IElementsFormProps<T>, 'formStructure' | 'label'>;

export type FormNumeric = FormComponentBaseProps<FormElementType.NUMERIC> & {
  min?: number;
  max?: number;
};

export type FormLocation = FormComponentBaseProps<FormElementType.LOCATION> & {
  caching?: boolean;
};

export type FormSelect = FormComponentBaseProps<FormElementType.MULTI_SELECT | FormElementType.SELECT> & {
  selectableValues?: string[];
};

export type FormComponentProps =
  | FormStringProperty
  | FormNumericProperty
  | FormText
  | FormNumeric
  | FormTag
  | FormSelect
  | FormTimingSelect
  | FormRequirement
  | FormLocation
  | FormArray
  | FormBoolean
  | FormReward
  | FormNested;

export type IFormStructure<Entity extends object = object> = {
  formElements: Record<keyof Entity, FormComponentProps>
};
