import { Button, H1, Intent } from '@blueprintjs/core';
import { IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import ElementsTable from '@component/ElementsTable/ElementsTable';
import { IColumnModel } from '@component/ElementsTable/ElementsTableResource';
import EntityFormDialog from '@modal/form/EntityFormDialog';
import {
  attributeFormStructure,
  locationFormStructure,
  objectiveFormStructure,
  propertyFormStructure,
} from '@modal/form/entityFormResources';
import BaseApi from '@shared/api/BaseApi';
import LocationApi from '@shared/api/LocationApi';
import AttributeApi from '@shared/api/statistic/AttributeApi';
import ObjectiveApi from '@shared/api/statistic/ObjectiveApi';
import PropertyApi from '@shared/api/statistic/PropertyApi';
import DocumentBase from '@type/DocumentBase';
import { ILocation } from '@type/location';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './entity-table.scss';
import { attributeColumns, locationColumns, objectiveColumns, propertyColumns } from './entityTableResources';

interface IEntityBaseTableProps {
  api: BaseApi;
  columns: IColumnModel[];
  title: string;
  formStructure?: IFormStructure;
  refreshOnEntityChange?: boolean;
  imageAdder?: 'default' | 'conditional';
}

const BaseEntityTable = (props: IEntityBaseTableProps): JSX.Element => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState<DocumentBase>(null);
  const [isFormOpen, setFormOpen] = useState(false);

  useEffect(() => {
    props.api.find().then(setEntities);
  }, []);

  const renderFormOpenButton = (): JSX.Element =>
    <Button icon="new-object" intent={Intent.PRIMARY} large onClick={() => setFormOpen(true)}>
      Create new
    </Button>;

  const renderImageAddButton = (): JSX.Element => {
    if (props.imageAdder) {
      const isSelected = selectedEntity && selectedEntity.id;
      return <Button disabled={!isSelected} icon="media" large intent={Intent.PRIMARY}>Add image</Button>;
    }
  };

  const renderEntityDeleteButton = (): JSX.Element => {
    const onDelete = () => {
      props.api.delete(selectedEntity.id).then((isDeleted: boolean) => {
        if (isDeleted) {
          if (props.refreshOnEntityChange) {
            props.api.find().then(setEntities);
          } else {
            setEntities(entities.filter((entity) => entity.id !== selectedEntity.id));
          }
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

  const onEntityAdd = (newEntity: object) => {
    if (props.refreshOnEntityChange) {
      props.api.find().then(setEntities);
    } else {
      setEntities([...entities, newEntity]);
    }
  };

  return (
    <>
      {props.formStructure &&
      <EntityFormDialog
        api={props.api}
        formStructure={props.formStructure}
        label={props.title}
        isOpen={isFormOpen}
        onSuccess={onEntityAdd}
        onClose={() => setFormOpen(false)}
      />}
      <div className="aw-9">
        <div className="entity-table-header">
          <H1>{props.title}</H1>{props.formStructure && renderFormOpenButton()}{renderImageAddButton()}
          {renderEntityDeleteButton()}
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

export const LocationTable = () => {
  const locationApi = new LocationApi();
  const [locations, setLocations] = useState<string[]>(null);
  useEffect(() => {
    locationApi.find().then((res: ILocation[]) => {
      setLocations(res.map((loc) => loc.name));
    });
  }, []);

  return locations && <BaseEntityTable
    title="Location"
    imageAdder="conditional"
    api={locationApi}
    columns={locationColumns}
    formStructure={locationFormStructure(locations)}
    refreshOnEntityChange
  />;
};
