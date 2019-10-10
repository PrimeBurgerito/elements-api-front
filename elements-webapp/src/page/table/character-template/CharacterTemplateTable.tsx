import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import CharacterTemplateApi from '@shared/api/CharacterTemplateApi';
import { ReactElement } from 'react';
import * as React from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';

const templateColumns = [
  {name: 'Attributes', key: 'attributes'},
  {name: 'Properties', key: 'properties'},
];

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

const CharacterTemplateTable = (): ReactElement<any> => {
  const characterTemplateApi = new CharacterTemplateApi();

  return <BaseEntityTable
    title="Character template"
    imageAdder="avatar"
    formStructure={characterForm}
    api={characterTemplateApi}
    columns={templateColumns}
  />;
};

export default CharacterTemplateTable;
