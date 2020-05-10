import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import ImageContainerApi from '@shared/api/container/ImageContainerApi';
import * as React from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';

const keyContainerColumns = [
  {name: 'Key', key: 'key'},
  {name: 'Images', key: 'images'},
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
    api={new ImageContainerApi()}
    columns={keyContainerColumns}
    formStructure={keyContainerForm}
    title="Key container"
    imageAdder="default"
  />;
};

export default ImageContainerTable;
