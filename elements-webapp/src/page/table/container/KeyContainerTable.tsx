import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import KeyContainerApi from '@shared/api/container/KeyContainerApi';
import * as React from 'react';
import { ReactElement } from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';

const keyContainerColumns = [
  {name: 'Key', key: 'key'},
  {name: 'Keys', key: 'keys'},
];

const keyContainerForm: IFormStructure = {
  formElements: {
    key: {
      label: 'Key',
      type: FormElementType.TEXT,
    },
    keys: {
      label: 'Keys',
      type: FormElementType.PROPERTY,
    },
  },
};


const KeyContainerTable = (): ReactElement<any> => {
  return <BaseEntityTable
    api={new KeyContainerApi()}
    columns={keyContainerColumns}
    formStructure={keyContainerForm}
    title={'Key container'}
  />;
};

export default KeyContainerTable;
