import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { characterTemplateRealmApi } from '@shared/api/CharacterTemplateApi';
import React from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';

const templateColumns = [
  { name: 'Properties', key: 'properties' },
  { name: 'Images', key: 'images' },
];

const characterForm: IFormStructure = {
  formElements: {
    numericProperties: {
      label: 'Numeric Properties',
      type: FormElementType.NUMERIC_PROPERTY,
    },
    stringProperties: {
      label: 'String Properties',
      type: FormElementType.STRING_PROPERTY,
    },
  },
};

const CharacterTemplateTable: React.FC = () => {
  return <BaseEntityTable
    title="Character template"
    imageAdder="avatar"
    formStructure={characterForm}
    api={characterTemplateRealmApi}
    columns={templateColumns}
    imagePath={['images']}
  />;
};

export default CharacterTemplateTable;
