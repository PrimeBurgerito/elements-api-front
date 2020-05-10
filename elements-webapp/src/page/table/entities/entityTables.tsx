import { numericPropertyFormStructure, objectiveFormStructure, stringPropertyFormStructure, } from '@modal/form/entityFormResources';
import NumericPropertyApi from '@shared/api/statistic/NumericPropertyApi';
import ObjectiveApi from '@shared/api/statistic/ObjectiveApi';
import StringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import * as React from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';
import { numericPropertyColumns, objectiveColumns, stringPropertyColumns } from './entityTableResources';

export const AttributeTable: React.FC = () =>
  <BaseEntityTable
    title="Numeric Property"
    api={new NumericPropertyApi()}
    columns={numericPropertyColumns}
    formStructure={numericPropertyFormStructure}
  />;

export const PropertyTable: React.FC = () =>
  <BaseEntityTable
    title="String Property"
    api={new StringPropertyApi()}
    columns={stringPropertyColumns}
    formStructure={stringPropertyFormStructure}
  />;

export const ObjectiveTable: React.FC = () =>
  <BaseEntityTable
    title="Objective"
    api={new ObjectiveApi()}
    columns={objectiveColumns}
    formStructure={objectiveFormStructure}
  />;
