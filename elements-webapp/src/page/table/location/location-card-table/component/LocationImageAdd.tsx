import { Button, Card, Classes, H2, Overlay } from '@blueprintjs/core';
import { Intent } from '@blueprintjs/core/lib/esnext';
import RequirementEdit from '@component/Requirement/RequirementEdit';
import locationApi from '@shared/api/LocationApi';
import { IConditionalImage, IConditionalImageDto } from '@type/image';
import { defaultRequirement, IRequirement } from '@type/Requirement';
import React, { useState } from 'react';
import { useImageAddHook } from '@component/ImageAdd/imageAddHook';
import ImageAdd from '@component/ImageAdd/ImageAdd';

type Props = {
  entityId: string;
  open: boolean;
  onAdd: (img: IConditionalImage) => void;
  onClose: () => void;
};

const OVERLAY_CLASS = [Classes.DARK, 'absolute-center'].join(' ');

const LocationImageAdd: React.FC<Props> = props => {
  const { handleImage, image } = useImageAddHook();
  const [requirement, setRequirement] = useState<IRequirement>(defaultRequirement());

  const onAdd = async (): Promise<void> => {
    const imageDto: IConditionalImageDto = {
      entityId: props.entityId,
      imageKey: image.key,
      requirement,
    };
    const imageResponse = await locationApi.putConditionalImage(imageDto, image.file);
    if (imageResponse) {
      props.onAdd(imageResponse);
      onClose();
    }
  };

  const isValidImage = (): boolean => {
    return !!image.file && !!image.key;
  };

  const onClose = () => {
    handleImage.clear();
    props.onClose();
  };

  return (
    <Overlay isOpen={props.open} onClose={onClose} className={Classes.OVERLAY_SCROLL_CONTAINER} transitionDuration={0}>
      <Card className={OVERLAY_CLASS}>
        <div className={Classes.DIALOG_HEADER}>
          <H2>New Image</H2>
        </div>
        <div className={Classes.DIALOG_BODY}>
          <ImageAdd hook={{ handleImage, image }} />
          <RequirementEdit value={requirement} onChange={setRequirement} />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.DANGER} onClick={onClose} text="Close" />
            <Button intent={Intent.SUCCESS} onClick={onAdd} disabled={!isValidImage()} text="Add" />
          </div>
        </div>
      </Card>
    </Overlay>
  );
};

export default LocationImageAdd;
