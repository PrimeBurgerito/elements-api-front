import { Button, ButtonGroup, H1, Intent, Tooltip } from '@blueprintjs/core';
import { IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import ElementsTable from '@component/ElementsTable/ElementsTable';
import { IColumnModel } from '@component/ElementsTable/ElementsTableResource';
import EntityFormDialog from '@modal/form/EntityFormDialog';
import ImageAddingDrawer from '@modal/form/ImageAddingDrawer';
import ImageEditDrawer from '@modal/form/ImageEditDrawer';
import BaseApi from '@shared/api/BaseApi';
import IDocumentBase from '@type/DocumentBase';
import { IConditionalImage, IImage } from '@type/image';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import './entity-table.scss';

type Props = {
  api: BaseApi<any>;
  columns: IColumnModel[];
  title: string;
  formStructure?: IFormStructure;
  refreshOnEntityChange?: boolean;
  imageAdder?: 'default' | 'conditional' | 'avatar';
  imagePath?: string[];
  onTableChange?: (entities: object[]) => void;
};

const BaseEntityTable: React.FC<Props> = (props) => {
  const [entities, setEntities] = useState<IDocumentBase[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<IDocumentBase>(null);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [isImageAdderOpen, setImageAdderOpen] = useState<boolean>(false);
  const [isImageEditOpen, setImageEditOpen] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<IImage[] | IConditionalImage[]>([]);

  useEffect(() => {
    props.api.find().then(setEntities);
  }, []);

  useEffect(() => {
    if (props.onTableChange) {
      props.onTableChange(entities);
    }
  }, [entities]);

  const renderFormOpenButton = (): React.ReactElement => {
    return props.formStructure && <Button
      icon="new-object" intent={Intent.PRIMARY} large onClick={() => setFormOpen(true)}>Create new
    </Button>;
  };

  const renderImageButtons = (): React.ReactElement => {
    const isSelected = selectedEntity && selectedEntity.id;
    const disableImageEdit = !isSelected || !selectedImages.length;
    const openAdd = () => setImageAdderOpen(true);
    const openEdit = () => setImageEditOpen(true);
    return props.imageAdder && <ButtonGroup large>
      <Tooltip disabled={!!isSelected} content="No item selected!">
        <Button disabled={!isSelected} onClick={openAdd} icon="media" intent={Intent.PRIMARY} text="Add image" />
      </Tooltip>
      <Tooltip disabled={!disableImageEdit} content={!isSelected ? 'No item selected!' : 'Selected item has no images!'}>
        <Button disabled={disableImageEdit} onClick={openEdit} icon="media" intent={Intent.PRIMARY} text="Edit images" />
      </Tooltip>
    </ButtonGroup>;
  };

  const renderEntityDeleteButton = (): React.ReactElement => {
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
    console.info(entity);
    if (props.imagePath) {
      const images = props.imagePath.reduce((res, curr) => res?.[curr], entity) || [];
      setSelectedImages(Array.isArray(images) ? images : Object.values(images));
    }
    setSelectedEntity(entity);
  };

  const onEntityAddSuccess = (newEntity: object) => {
    if (props.refreshOnEntityChange) {
      props.api.find().then(setEntities);
    } else {
      setEntities([...entities, newEntity]);
    }
  };

  const renderEntityFormDialog = (): React.ReactElement => {
    return <EntityFormDialog
      api={props.api}
      formStructure={props.formStructure}
      label={props.title}
      isOpen={isFormOpen}
      onSuccess={onEntityAddSuccess}
      onClose={() => setFormOpen(false)}
    />;
  };

  const renderImageAddingDrawer = (): React.ReactElement => {
    const onClose = () => setImageAdderOpen(false);
    return <ImageAddingDrawer
      entityId={selectedEntity.id}
      isOpen={isImageAdderOpen}
      label={props.title}
      type={props.imageAdder}
      onClose={onClose}
      api={props.api}
    />;
  };

  const renderImageEditDrawer = (): React.ReactElement => {
    const onClose = () => setImageEditOpen(false);
    // @ts-ignore
    return <ImageEditDrawer images={selectedImages} type={props.imageAdder} isOpen={isImageEditOpen} onClose={onClose} />;
  };

  const memoizedTable = useMemo(() => <ElementsTable data={entities} columns={props.columns} onSelect={onEntitySelect} />,
    [entities]);

  return (
    <>
      {props.formStructure && renderEntityFormDialog()}
      {props.imageAdder && selectedEntity && renderImageAddingDrawer()}
      {Boolean(props.imageAdder && selectedEntity && selectedImages.length) && renderImageEditDrawer()}
      <div className="aw-9">
        <div className="entity-table-header">
          <H1>{props.title}</H1>{renderFormOpenButton()}{renderImageButtons()}{renderEntityDeleteButton()}
        </div>
        {memoizedTable}
      </div>
    </>
  );
};

export default BaseEntityTable;
