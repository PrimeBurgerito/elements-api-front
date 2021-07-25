import React, { useRef, useState } from 'react';
import { Button, FormGroup, InputGroup, Switch, Tooltip } from '@blueprintjs/core';
import { useToggle } from '@shared/hooks/toggleHook';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { ImageAddHook } from '@component/ImageAdd/imageAddHook';

type Props = {
  src: string,
  setCrop?: ImageAddHook['handleImage']['setCrop'],
}

const ImageRenderer: React.FC<Props> = props => {
  const [cropActive, toggleCrop] = useToggle(false);
  const cropperRef = useRef<ReactCropperElement>();
  const [cropKey, setCropKey] = useState('');

  const setCrop = (): void => {
    if (cropKey) {
      props.setCrop(cropKey, cropperRef.current.cropper.getData())
    }
  };

  const renderImage = (): React.ReactElement => {
    if (!cropActive) {
      return <img src={props.src} alt="None" />;
    }

    return <Cropper
      ref={cropperRef}
      src={props.src}
      aspectRatio={3 / 4}
      zoomable={false}
    />
  }

  const renderCropForm = (): React.ReactElement => {
    return (
      <>
        <FormGroup label="Crop key" labelFor="crop-key" labelInfo="(required)">
          <InputGroup
            id="crop-key"
            placeholder="Set key for cropping..."
            value={cropKey}
            onChange={e => setCropKey(e.target.value)}
            type="text"
          />
        </FormGroup>
        <Tooltip content="Crop key can't be empty!" disabled={!!cropKey}>
          <Button text="Set crop" disabled={!cropKey} onClick={setCrop} />
        </Tooltip>
      </>
    );
  }

  return (
    <>
      {props.setCrop && <Switch checked={cropActive} label="Crop" onChange={toggleCrop} />}
      {cropActive && renderCropForm()}
      <br />
      <div style={{ textAlign: 'center' }}>
        {renderImage()}
      </div>
    </>
  );
}

export default ImageRenderer;
