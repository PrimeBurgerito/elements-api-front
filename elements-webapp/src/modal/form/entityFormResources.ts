import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import IDocumentBase from '@type/DocumentBase';
import { INumericProperty, IObjective, IStringProperty } from '@type/statistics';

export const numericPropertyFormStructure: IFormStructure<Omit<INumericProperty, keyof IDocumentBase>> = {
  formElements: {
    name: {label: 'Attribute name', type: FormElementType.TEXT},
    key: {label: 'Attributes unique key', type: FormElementType.TEXT},
    min: {label: 'Minimum value', type: FormElementType.NUMERIC},
    max: {label: 'Maximum value', type: FormElementType.NUMERIC},
    value: {label: 'Default value', type: FormElementType.NUMERIC},
  },
};

export const stringPropertyFormStructure: IFormStructure<Omit<IStringProperty, keyof IDocumentBase>> = {
  formElements: {
    name: {label: 'Property name', type: FormElementType.TEXT},
    key: {label: 'Properties unique key', type: FormElementType.TEXT},
    possibleValues: {label: 'Possible values', type: FormElementType.TAG},
    value: {label: 'Default value', type: FormElementType.TAG},
    type: {label: 'Value type', type: FormElementType.TEXT}
  },
};

export const objectiveFormStructure: IFormStructure<Omit<IObjective, keyof IDocumentBase>> = {
  formElements: {
    value: {label: 'Objective unique value', type: FormElementType.TEXT},
  },
};
