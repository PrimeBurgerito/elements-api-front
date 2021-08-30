import React, { CSSProperties, useRef, useState } from 'react';
import { Button, ControlGroup, FormGroup, HTMLSelect, InputGroup, Switch, Tooltip } from '@blueprintjs/core';
import { useToggle } from '@shared/hooks/toggleHook';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { IImageCrop } from '@type/image';
import { RecordSelectHook } from '@shared/hooks/recordSelectHook';

type Props = {
  src: string,
  maxWidth?: string | number,
  crops?: RecordSelectHook<IImageCrop>
}

const ImageRenderer: React.FC<Props> = props => {
  const cropperRef = useRef<ReactCropperElement>();
  const [cropActive, toggleCrop] = useToggle(false);
  const [cropKey, setCropKey] = useState('');
  const cropKeys: string[] = props.crops ? Object.keys(props.crops.record) : null;

  const setCrop = (): void => {
    if (cropKey) {
      props.crops.set(cropKey, cropperRef.current.cropper.getData(), true)
    }
  };

  const renderImage = (): React.ReactElement => {
    if (!cropActive) {
      const style: CSSProperties = props.maxWidth ? { maxWidth: props.maxWidth } : {};
      return <img src={props.src} alt="None" style={style} />;
    }

    return <Cropper
      ref={cropperRef}
      src={props.src}
      aspectRatio={3 / 4}
      zoomable={false}
    />
  }

  const onCropChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const crop = props.crops.select(e.target.value);
    cropperRef.current.cropper.setData(crop);
  }

  const renderCropForm = (): React.ReactElement => {
    return (
      <FormGroup label="Add new crop" labelFor="crop-key" labelInfo="(required)">
        <ControlGroup id="crop-key">
          <HTMLSelect
            options={cropKeys.length ? cropKeys : ['(none)']}
            disabled={!cropKeys.length}
            onChange={onCropChange}
          />
          <InputGroup
            placeholder="Insert key..."
            value={cropKey}
            onChange={e => setCropKey(e.target.value)}
            type="text"
          />
          <Tooltip content="Crop key can't be empty!" disabled={!!cropKey}>
            <Button text="Add" disabled={!cropKey} onClick={setCrop} />
          </Tooltip>
        </ControlGroup>
      </FormGroup>
    );
  }

  return (
    <>
      {props.crops && <Switch checked={cropActive} label="Crop" onChange={toggleCrop} />}
      {cropActive && renderCropForm()}
      <br />
      <div style={{ textAlign: 'center' }}>
        {renderImage()}
      </div>
    </>
  );
}

export default ImageRenderer;
