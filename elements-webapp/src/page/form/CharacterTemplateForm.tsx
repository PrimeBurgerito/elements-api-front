import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import * as React from 'react';

const characterForm: IFormStructure = {
  formElements: {
    attributes: {
      label: 'Attributes',
      type: FormElementType.ATTRIBUTE,
    },
    properties: {
      label: 'Properties',
      type: FormElementType.PROPERTY,
    },
  },
};

const CharacterTemplateForm = () =>
  <ElementsForm
    onChange={() => null}
    formStructure={characterForm}
    label="Character template"
  />;

export default CharacterTemplateForm;
