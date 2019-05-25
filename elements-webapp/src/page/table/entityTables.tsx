import { Button, H1, Intent } from '@blueprintjs/core';
import { IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import ElementsTable from '@component/ElementsTable/ElementsTable';
import { IColumnModel } from '@component/ElementsTable/ElementsTableResource';
import EntityFormDialog from '@modal/form/EntityFormDialog';
import { attributeFormStructure, objectiveFormStructure, propertyFormStructure } from '@modal/form/entityFormResources';
import BaseApi from '@shared/api/BaseApi';
import AttributeApi from '@shared/api/statistic/AttributeApi';
import ObjectiveApi from '@shared/api/statistic/ObjectiveApi';
import PropertyApi from '@shared/api/statistic/PropertyApi';
import DocumentBase from '@type/DocumentBase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './entity-table.scss';
import { attributeColumns, objectiveColumns, propertyColumns } from './entityTableResources';

interface IEntityBaseTableProps {
  api: BaseApi;
  columns: IColumnModel[];
  title: string;
  formStructure?: IFormStructure;
}

const BaseEntityTable = (props: IEntityBaseTableProps): JSX.Element => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState<DocumentBase>(null);
  const [isFormOpen, setFormOpen] = useState(false);

  useEffect(() => {
    props.api.find().then(setEntities);
  }, []);

  const renderFormOpenButton = () =>
    <Button icon="new-object" intent={Intent.PRIMARY} large onClick={() => setFormOpen(true)}>
      Create new
    </Button>;

  const renderEntityDeleteButton = () => {
    const onDelete = () => {
      props.api.delete(selectedEntity.id).then((isDeleted: boolean) => {
        if (isDeleted) {
          setEntities(entities.filter((entity) => entity.id !== selectedEntity.id));
          setSelectedEntity(null);
        }
      });
    };

    const isSelected = selectedEntity && selectedEntity.id;
    return <Button disabled={!isSelected} onClick={onDelete} icon="trash" large intent={Intent.DANGER}>Delete</Button>;
  };

  const onEntitySelect = (entity: object) => {
    setSelectedEntity(entity);
  };

  return (
    <>
      {props.formStructure &&
      <EntityFormDialog
        api={props.api}
        formStructure={props.formStructure}
        label={props.title}
        isOpen={isFormOpen}
        onSuccess={(res) => setEntities([...entities, res])}
        onClose={() => setFormOpen(false)}
      />}
      <div className="aw-9">
        <div className="entity-table-header">
          <H1>{props.title}</H1>{props.formStructure && renderFormOpenButton()}{renderEntityDeleteButton()}
        </div>
        <ElementsTable data={entities} columns={props.columns} onSelect={onEntitySelect} />
      </div>

    </>
  );
};

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
