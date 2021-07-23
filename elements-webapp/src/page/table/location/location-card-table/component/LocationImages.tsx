import { Button, ButtonGroup, Callout, H6 } from '@blueprintjs/core';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';
import { MEDIA_URL } from '@constant/paths';
import locationApi from '@shared/api/LocationApi';
import { useArraySelectHook } from '@shared/hooks/arraySelectHook';
import { useToggle } from '@shared/hooks/toggleHook';
import { errorNotice } from '@shared/notice/notices';
import { IConditionalImage } from '@type/image';
import React, { useState } from 'react';
import LocationImageAdd from './LocationImageAdd';

type Props = {
  entityId: string,
  images: IConditionalImage[],
};

const LocationImages: React.FC<Props> = props => {
  const images = useArraySelectHook(props.images);
  const [removing, setRemoving] = useState(false);
  const [imageAddOpen, toggleImageAdd] = useToggle(false);
  // const [imageEditOpen, toggleImageEdit] = useToggle(false);

  const canSelectImages = (): boolean => images.length > 1;

  const onImageRemove = async () => {
    setRemoving(true);
    const success = await locationApi.removeImage(props.entityId, images.selectedItem.image.key);
    setRemoving(false);
    if (success) {
      images.removeCurrent();
    } else {
      errorNotice('Image remove failed');
    }
  };

  return (
    <Callout className="c-item-image">
      <H6>
        Images
        <ButtonGroup style={{ float: 'right' }}>
          <Button intent={Intent.SUCCESS} icon={IconNames.Add} onClick={toggleImageAdd} />
          {/*<Button intent={Intent.WARNING} icon={IconNames.EDIT} disabled={!images.length} onClick={toggleImageEdit} />*/}
          <Button
            intent={Intent.DANGER}
            icon={IconNames.Trash}
            disabled={!images.length}
            onClick={onImageRemove}
            loading={removing}
          />
        </ButtonGroup>
      </H6>
      <div className="location-image-container">
        <Button
          className="btn-left"
          icon={IconNames.ArrowLeft}
          large
          outlined
          onClick={images.previous}
          disabled={!canSelectImages()}
        />
        <div className="location-image">
          {images.selectedItem && <img src={`${MEDIA_URL}/${images.selectedItem.image.fileName}`} alt="None" />}
        </div>
        <Button
          className="btn-right"
          icon={IconNames.ArrowRight}
          large
          outlined
          onClick={images.next}
          disabled={!canSelectImages()}
        />
      </div>
      <LocationImageAdd open={imageAddOpen} onClose={toggleImageAdd} entityId={props.entityId} onAdd={images.add} />
    </Callout>
  );
};

export default LocationImages;
