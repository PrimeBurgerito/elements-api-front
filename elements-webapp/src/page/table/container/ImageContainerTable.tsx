import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { keyContainerRealmApi } from '@shared/api/container/ImageContainerApi';
import React from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';

const keyContainerColumns = [
  { name: 'Key', key: 'key' },
  { name: 'Images', key: 'images' },
];

const keyContainerForm: IFormStructure = {
  formElements: {
    key: {
      label: 'Key',
      type: FormElementType.TEXT,
    },
  },
};

const ImageContainerTable: React.FC = () => {
  return <BaseEntityTable
    api={keyContainerRealmApi}
    columns={keyContainerColumns}
    formStructure={keyContainerForm}
    title="Key container"
    imageAdder="default"
  />;
};

export default ImageContainerTable;
