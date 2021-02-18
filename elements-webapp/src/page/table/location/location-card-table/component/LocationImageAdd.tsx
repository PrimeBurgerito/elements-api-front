import { Button, Card, Classes, FileInput, FormGroup, H2, InputGroup, Overlay } from '@blueprintjs/core';
import { Intent } from '@blueprintjs/core/lib/esnext';
import RequirementEdit from '@component/Requirement/RequirementEdit';
import locationApi from '@shared/api/LocationApi';
import { errorNotice } from '@shared/notice/notices';
import { IConditionalImage, IConditionalImageDto } from '@type/image';
import { defaultRequirement, IRequirement } from '@type/Requirement';
import * as React from 'react';
import { ChangeEventHandler, ClipboardEventHandler, useMemo, useState } from 'react';

type Props = {
  entityId: string;
  open: boolean;
  onAdd: (img: IConditionalImage) => void;
  onClose: () => void;
};

const OVERLAY_CLASS = [Classes.DARK, 'absolute-center'].join(' ');

const LocationImageAdd: React.FC<Props> = props => {
  const [imageFile, setImageFile] = useState<File>();
  const [pasteInputText, setPasteInputText] = useState<string>('');
  const [imageKey, setImageKey] = useState<string>();
  const [requirement, setRequirement] = useState<IRequirement>(defaultRequirement());

  const onImageAdd = ({target}) => {
    setImageFile(target.files[0]);
  };

  const onImagePaste: ClipboardEventHandler = (e) => {
    const file = e.clipboardData.files.length === 1 && e.clipboardData.files[0];
    if (file) {
      if (file.type.startsWith('image')) {
        setPasteInputText(file.name);
        setImageFile(file);
      } else {
        errorNotice(`Pasted file (${file.type}) does not seem like an image!`);
      }
    } else {
      errorNotice('No files in clipboard!');
    }
  };

  const onAdd = async (): Promise<void> => {
    const imageDto: IConditionalImageDto = {
      entityId: props.entityId,
      imageKey,
      requirement,
    };
    const imageResponse = await locationApi.putConditionalImage(imageDto, imageFile);
    if (imageResponse) {
      props.onAdd(imageResponse);
      onClose();
    }
  };

  const onImageKeyChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setImageKey(event.target.value);
  };

  const isValidImage = (): boolean => {
    return !!imageFile && !!imageKey;
  };

  const onClose = () => {
    setImageFile(null);
    setImageKey(null);
    setPasteInputText('');
    props.onClose();
  };

  const memoizedImage: string = useMemo<string>(() => !!imageFile ? URL.createObjectURL(imageFile) : '', [imageFile]);

  return (
    <Overlay isOpen={props.open} onClose={onClose} className={Classes.OVERLAY_SCROLL_CONTAINER} transitionDuration={0}>
      <Card className={OVERLAY_CLASS}>
        <div className={Classes.DIALOG_HEADER}>
          <H2>New Image</H2>
        </div>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Image name" labelFor="image-name">
            <InputGroup id="image-name" placeholder="Insert image..." onChange={onImageKeyChange} />
          </FormGroup>
          <FormGroup label="Add image" labelFor="image-input">
            <FileInput id="image-input" text="Choose file..." fill onChange={onImageAdd} />
          </FormGroup>
          <p>OR</p>
          <FormGroup label="Paste image from clipboard" labelInfo="(Ctrl + V)" labelFor="image-paste">
            <InputGroup id="image-paste" readOnly value={pasteInputText} placeholder="Paste image..." fill onPaste={onImagePaste} />
          </FormGroup>
          <div style={{textAlign: 'center'}}>
            {!!imageFile && <img src={memoizedImage} alt="No image" />}
          </div>
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
