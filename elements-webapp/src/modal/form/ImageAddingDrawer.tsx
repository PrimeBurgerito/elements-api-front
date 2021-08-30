import { Button, Checkbox, Classes, Drawer, FileInput, Position } from '@blueprintjs/core';
import { Intent } from '@blueprintjs/core/lib/esm/common/intent';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { POST_LOADING } from '@shared/api/request-template/requests';
import { LoadingStore } from '@shared/store/LoadingStore';
import { IConditionalImageDto, IImageDto } from '@type/image';
import 'cropperjs/dist/cropper.css';
import React, { ReactElement, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import './imageAddingDialog.scss';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';


const defaultStructure: IFormStructure = {
  formElements: {
    imageKey: { label: 'Unique image key', type: FormElementType.TEXT },
  },
};

const conditionalStructure: IFormStructure = {
  formElements: {
    imageKey: { label: 'Unique image key', type: FormElementType.TEXT },
    requirement: { label: 'Image requirement', type: FormElementType.REQUIREMENT },
  },
};

type Props = {
  entityId: string;
  isOpen: boolean;
  label: string;
  type: 'default' | 'conditional' | 'avatar';
  onClose: () => void;
  onSuccess?: (res: any) => void;
  api: RealmDocumentApi;
};

const ImageAddingDrawer: React.FC<Props> = (props) => {
  const [imageDto, setImageDto] = useState<IImageDto | IConditionalImageDto>({
    entityId: props.entityId,
    imageKey: ''
  });
  const [imageFile, setImageFile] = useState<File>(null);
  const [imageSrc, setImageSrc] = useState<string>(null);
  const [saveCropped, setSaveCropped] = useState<boolean>(false);
  const cropper = useRef<any>();

  const clickCreate = () => {
    if (cropper.current && saveCropped) {
      cropper.current.getCroppedCanvas()
        .toBlob((blob) => saveImage(new File([blob], `${imageDto.imageKey}_${Math.random() * 1000}.jpg`)));
    } else {
      saveImage(imageFile);
    }
  };

  const saveImage = (file: File): void => {
    if (props.type === 'conditional') {
      props.api.putConditionalImage(imageDto, file).then(console.log);
    } else {
      props.api.putImage(imageDto, file).then(console.log);
    }
  };

  const onDialogClose = () => {
    setImageDto({ entityId: props.entityId, imageKey: '' });
    setImageFile(null);
    setImageSrc(null);
    props.onClose();
  };

  const onFileAdd = ({ target }) => {
    setImageFile(target.files[0]);
    setImageSrc(URL.createObjectURL(target.files[0]));
  };

  const handleFormChange = (change: object) => {
    setImageDto({ ...imageDto, ...change });
  };

  const onCropDtoChange = (e: CustomEvent): void => setImageDto({ ...imageDto, crops: { avatar: e.detail } });
  const renderImage = (): ReactElement => {
    if (props.type !== 'avatar') {
      if (saveCropped) {
        return <Cropper ref={cropper} src={imageSrc} zoomable={false} />;
      }
      return <img className="dialog-img" src={imageSrc} alt="No image" />;
    }
    return <Cropper crop={onCropDtoChange} src={imageSrc} aspectRatio={3 / 4} zoomable={false} />;
  };

  const renderCreateButton = (): ReactElement => <Button
    large
    intent={Intent.PRIMARY}
    loading={LoadingStore.isLoading(POST_LOADING)}
    disabled={!imageFile}
    onClick={clickCreate}
    text="Create"
  />;
  const renderSaveCroppedImageToggle = (): ReactElement => props.type !== 'avatar' && <Checkbox
    checked={saveCropped} label="Save cropped image?" onChange={({ target }) => setSaveCropped(target['checked'])} />;

  return (
    <Drawer
      className={Classes.DARK}
      style={{ overflow: 'auto' }}
      position={Position.LEFT}
      title={props.label}
      isOpen={props.isOpen}
      onClose={onDialogClose}
      canOutsideClickClose={false}
    >
      <div className={Classes.DIALOG_BODY}>
        <ElementsForm
          formStructure={props.type === 'conditional' ? conditionalStructure : defaultStructure}
          onChange={handleFormChange}
        />
        {renderSaveCroppedImageToggle()}
        <FileInput fill text="Choose image" onChange={onFileAdd} />
        {imageFile && renderImage()}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS} style={{ marginBottom: 10 }}>
          <Button large intent="warning" onClick={() => console.log(imageDto)}>Test</Button>
          {renderCreateButton()}
        </div>
      </div>
    </Drawer>
  );
};

export default ImageAddingDrawer;
