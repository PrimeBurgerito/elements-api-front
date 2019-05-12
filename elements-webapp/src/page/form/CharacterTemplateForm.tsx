import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { IAttribute, IProperty } from '@type/statistics';
import * as React from 'react';

const attributes: IAttribute[] = [{
  id: '1',
  max: 100,
  min: 0,
  name: 'Health',
}, {
  id: '2',
  max: 100,
  min: 0,
  name: 'Magic',
}, {
  id: '3',
  max: 100,
  min: 0,
  name: 'Strength',
}];

const properties: IProperty[] = [{
  id: '1',
  name: 'Sex',
  values: ['Futanari', 'Female'],
}, {
  id: '2',
  name: 'Breast size',
  values: ['Small', 'Normal', 'Large'],
}];

const characterForm: IFormStructure = {
  formElements: {
    attributes: {
      attributes,
      label: 'Attributes',
      type: FormElementType.ATTRIBUTE,
    },
    properties: {
      label: 'Properties',
      properties,
      type: FormElementType.PROPERTY,
    },
  },
};

const CharacterTemplateForm = () => <ElementsForm formStructure={characterForm} label="Character template" />;

export default CharacterTemplateForm;
