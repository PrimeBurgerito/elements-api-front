import {
  attributeFormStructure,
  objectiveFormStructure,
  propertyFormStructure,
} from '@modal/form/entityFormResources';
import AttributeApi from '@shared/api/statistic/AttributeApi';
import ObjectiveApi from '@shared/api/statistic/ObjectiveApi';
import PropertyApi from '@shared/api/statistic/PropertyApi';
import * as React from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';
import { attributeColumns, objectiveColumns, propertyColumns } from './entityTableResources';

export const AttributeTable = () =>
  <BaseEntityTable
    title="Attribute"
    api={new AttributeApi()}
    columns={attributeColumns}
    formStructure={attributeFormStructure}
  />;

export const PropertyTable = () =>
  <BaseEntityTable
    title="Property"
    api={new PropertyApi()}
    columns={propertyColumns}
    formStructure={propertyFormStructure}
  />;

export const ObjectiveTable = () =>
  <BaseEntityTable
    title="Objective"
    api={new ObjectiveApi()}
    columns={objectiveColumns}
    formStructure={objectiveFormStructure}
  />;
