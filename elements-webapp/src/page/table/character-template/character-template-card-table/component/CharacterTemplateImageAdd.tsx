import React, { useMemo } from 'react';
import { useImageAddHook } from '@component/ImageAdd/imageAddHook';
import ImageAdd from '@component/ImageAdd/ImageAdd';
import { Button, Card, Classes, H2, Overlay, Tooltip } from '@blueprintjs/core';
import { IImage, IImageDto } from '@type/image';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { CharacterTemplateV2Api } from '@shared/api/CharacterTemplateApi';

const OVERLAY_CLASS = [Classes.DARK, 'absolute-center'].join(' ');

type Props = {
  entityId: string;
  open: boolean;
  onAdd: (img: IImage) => void;
  onClose: () => void;
};

export const CharacterTemplateImageAdd: React.FC<Props> = props => {
  const { handleImage, image } = useImageAddHook();

  const isValidImage = useMemo(() => {
    const cropKeys = Object.keys(image.crops);
    const validCropKeys = !cropKeys.length || cropKeys.every(Boolean);
    return !!image.file && !!image.key && validCropKeys;
  }, [image.file, image.key, image.crops])

  const onAdd = async (): Promise<void> => {
    const imageDto: IImageDto = {
      entityId: props.entityId,
      imageKey: image.key,
      crops: image.crops,
    };
    const imageResponse = await CharacterTemplateV2Api.putImage(imageDto, image.file);
    if (imageResponse) {
      props.onAdd(imageResponse);
      onClose();
    }
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
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.DANGER} onClick={onClose} text="Close" />
            <Tooltip disabled={isValidImage} content="Required fields can't be empty!">
              <Button intent={Intent.SUCCESS} onClick={onAdd} disabled={!isValidImage} text="Add" />
            </Tooltip>
          </div>
        </div>
      </Card>
    </Overlay>
  );
}

export default CharacterTemplateImageAdd;
