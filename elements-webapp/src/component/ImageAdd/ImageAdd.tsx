import React from 'react';
import { FileInput, FormGroup, InputGroup } from '@blueprintjs/core';
import { ImageAddHook } from '@component/ImageAdd/imageAddHook';
import ImageRenderer from '@component/ImageAdd/ImageRenderer';
import { IImageCrop } from '@type/image';
import { RecordSelectHook } from '@shared/hooks/recordSelectHook';

type Props = {
  hook: ImageAddHook,
  cropsHook?: RecordSelectHook<IImageCrop>,
}

const ImageAdd: React.FC<Props> = props => {
  const { handleImage, image } = props.hook;

  return (
    <>
      <FormGroup label="Image name" labelFor="image-name" labelInfo="(required)">
        <InputGroup id="image-name" placeholder="Insert image..." onChange={handleImage.onKeyChange} />
      </FormGroup>
      <FormGroup label="Add image" labelFor="image-input">
        <FileInput id="image-input" text="Choose file..." fill onInputChange={handleImage.onAdd} />
      </FormGroup>
      <p>OR</p>
      <FormGroup label="Paste image from clipboard" labelInfo="(Ctrl + V)" labelFor="image-paste">
        <InputGroup
          fill
          id="image-paste"
          readOnly
          value={image.clipboardImageName}
          placeholder="Paste image..."
          onPaste={handleImage.onPaste}
        />
      </FormGroup>
      {!!image.file && <ImageRenderer src={image.src} crops={props.cropsHook} />}
    </>
  );
}

export default ImageAdd;