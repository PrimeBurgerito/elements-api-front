import { numericPropertyFormStructure, objectiveFormStructure, stringPropertyFormStructure, } from '@modal/form/entityFormResources';
import numericPropertyApi from '@shared/api/statistic/NumericPropertyApi';
import objectiveApi from '@shared/api/statistic/ObjectiveApi';
import stringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import * as React from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';
import { numericPropertyColumns, objectiveColumns, stringPropertyColumns } from './entityTableResources';

export const AttributeTable: React.FC = () =>
  <BaseEntityTable
    title="Numeric Property"
    api={numericPropertyApi}
    columns={numericPropertyColumns}
    formStructure={numericPropertyFormStructure}
  />;

export const PropertyTable: React.FC = () =>
  <BaseEntityTable
    title="String Property"
    api={stringPropertyApi}
    columns={stringPropertyColumns}
    formStructure={stringPropertyFormStructure}
  />;

export const ObjectiveTable: React.FC = () =>
  <BaseEntityTable
    title="Objective"
    api={objectiveApi}
    columns={objectiveColumns}
    formStructure={objectiveFormStructure}
  />;
