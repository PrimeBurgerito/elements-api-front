import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';

export const attributeFormStructure: IFormStructure = {
  formElements: {
    name: { label: 'Attribute name', type: FormElementType.TEXT },
    min: { label: 'Minimum value', type: FormElementType.NUMERIC },
    max: { label: 'Maximum value', type: FormElementType.NUMERIC },
  },
};

export const propertyFormStructure: IFormStructure = {
  formElements: {
    name: { label: 'Property name', type: FormElementType.TEXT },
    values: { label: 'Possible values', type: FormElementType.TAG },
  },
};

export const objectiveFormStructure: IFormStructure = {
  formElements: {
    name: { label: 'Objective name', type: FormElementType.TEXT },
  },
};

export const locationFormStructure = (values: string[]): IFormStructure => ({
  formElements: {
    name: { label: 'Name', type: FormElementType.TEXT },
    nearbyLocations: { label: 'Nearby locations', type: FormElementType.MULTISELECT, values },
  },
});
