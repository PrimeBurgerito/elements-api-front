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
import ImageAddingDialog from '@modal/form/ImageAddingDialog';
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
  onTableChange?: (entities: object[]) => void;
}

const BaseEntityTable = (props: IEntityBaseTableProps): JSX.Element => {
  const [entities, setEntities] = useState<DocumentBase[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<DocumentBase>(null);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [isImageAdderOpen, setImageAdderOpen] = useState<boolean>(false);

  useEffect(() => {
    props.api.find().then(setEntities);
  }, []);

  useEffect(() => {
    if (props.onTableChange) {
      props.onTableChange(entities);
    }
  }, [entities]);

  const renderFormOpenButton = (): JSX.Element => {
    return props.formStructure && <Button
      icon="new-object" intent={Intent.PRIMARY} large onClick={() => setFormOpen(true)}>Create new
    </Button>;
  };

  const renderImageAddButton = (): JSX.Element => {
    const isSelected = selectedEntity && selectedEntity.id;
    return props.imageAdder && <Button
      large disabled={!isSelected} onClick={() => setImageAdderOpen(true)} icon="media" intent={Intent.PRIMARY}>
      Add image
    </Button>;
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

  const onEntityAddSuccess = (newEntity: object) => {
    if (props.refreshOnEntityChange) {
      props.api.find().then(setEntities);
    } else {
      setEntities([...entities, newEntity]);
    }
  };

  const renderEntityFormDialog = () => {
    return <EntityFormDialog
      api={props.api}
      formStructure={props.formStructure}
      label={props.title}
      isOpen={isFormOpen}
      onSuccess={onEntityAddSuccess}
      onClose={() => setFormOpen(false)}
    />;
  };

  const renderImageAddingDialog = (): JSX.Element => {
    return <ImageAddingDialog
      entityId={selectedEntity.id}
      isOpen={isImageAdderOpen}
      label={props.title}
      onClose={() => setImageAdderOpen(false)}
      api={props.api}
    />;
  };

  return (
    <>
      {props.formStructure && renderEntityFormDialog()}
      {props.imageAdder && selectedEntity && renderImageAddingDialog()}
      <div className="aw-9">
        <div className="entity-table-header">
          <H1>{props.title}</H1>{renderFormOpenButton()}{renderImageAddButton()}{renderEntityDeleteButton()}
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
  const [formStructure, setFormStructure] = useState<IFormStructure>(null);

  useEffect(() => {
    locationApi.find().then((res: ILocation[]) => {
      setFormStructure(locationFormStructure(mapLocationNames(res)));
    });
  }, []);

  const mapLocationNames = (res: ILocation[]): string[] => {
    return res.map((loc) => loc.name);
  };

  const onTableChange = (locations: ILocation[]) => {
    setFormStructure(locationFormStructure(mapLocationNames(locations)));
  };

  return formStructure && <BaseEntityTable
    title="Location"
    imageAdder="conditional"
    api={locationApi}
    columns={locationColumns}
    formStructure={formStructure}
    refreshOnEntityChange
    onTableChange={onTableChange}
  />;
};
