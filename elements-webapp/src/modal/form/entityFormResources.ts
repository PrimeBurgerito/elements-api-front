import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { INumericProperty, IObjective, IStringProperty } from '@type/statistics';
import { IRealmDocument } from '@type/Realm';

export const numericPropertyFormStructure: IFormStructure<Omit<INumericProperty, keyof IRealmDocument>> = {
  formElements: {
    name: { label: 'Attribute name', type: FormElementType.TEXT },
    key: { label: 'Attributes unique key', type: FormElementType.TEXT },
    min: { label: 'Minimum value', type: FormElementType.NUMERIC },
    max: { label: 'Maximum value', type: FormElementType.NUMERIC },
    value: { label: 'Default value', type: FormElementType.NUMERIC },
  },
};

export const stringPropertyFormStructure: IFormStructure<Omit<IStringProperty, keyof IRealmDocument>> = {
  formElements: {
    name: { label: 'Property name', type: FormElementType.TEXT },
    key: { label: 'Properties unique key', type: FormElementType.TEXT },
    possibleValues: { label: 'Possible values', type: FormElementType.TAG },
    value: { label: 'Default value', type: FormElementType.TAG },
    type: { label: 'Value type', type: FormElementType.SELECT, selectableValues: ['SINGLE', 'UNIQUE', 'MULTIPLE'] }
  },
};

export const objectiveFormStructure: IFormStructure<Omit<IObjective, keyof IRealmDocument>> = {
  formElements: {
    value: { label: 'Objective unique value', type: FormElementType.TEXT },
  },
};
