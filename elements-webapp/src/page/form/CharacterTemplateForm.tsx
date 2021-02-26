import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import React from 'react';

const characterForm: IFormStructure = {
  formElements: {
    numericProperties: {
      label: 'Attributes',
      type: FormElementType.NUMERIC_PROPERTY,
    },
    stringProperties: {
      label: 'Properties',
      type: FormElementType.STRING_PROPERTY,
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
