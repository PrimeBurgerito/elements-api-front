import { Button, Classes, Dialog, FileInput } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import BaseApi from '@shared/api/BaseApi';
import { POST_LOADING } from '@shared/api/request-template/requests';
import { LoadingStore } from '@shared/store/LoadingStore';
import { IConditionalImageDto, IImageCrop, IImageDto } from '@type/image';
import 'cropperjs/dist/cropper.css';
import * as React from 'react';
import { createRef, ReactElement, useState } from 'react';
import Cropper from 'react-cropper';
import './imageAddingDialog.scss';


const defaultStructure: IFormStructure = {
  formElements: {
    imageKey: {label: 'Unique image key', type: FormElementType.TEXT},
  },
};

const conditionalStructure: IFormStructure = {
  formElements: {
    imageKey: {label: 'Unique image key', type: FormElementType.TEXT},
    requirement: {label: 'Image requirement', type: FormElementType.REQUIREMENT},
  },
};

interface IImageAddingDialogProps {
  entityId: string;
  isOpen: boolean;
  label: string;
  type: 'default' | 'conditional' | 'avatar';
  onClose: () => void;
  onSuccess?: (res: any) => void;
  api: BaseApi<any>;
}

const ImageAddingDialog = (props: IImageAddingDialogProps): JSX.Element => {
  const [imageDto, setImageDto] = useState<IImageDto | IConditionalImageDto>({entityId: props.entityId, imageKey: ''});
  const [imageFile, setImageFile] = useState<File>(null);
  const cropper = createRef<any>();

  const clickCreate = () => {
    switch (props.type) {
      case 'conditional':
        props.api.putConditionalImage(imageDto, imageFile).then(console.log);
        break;
      case 'avatar':
        const imageCrop = cropper.current.getData(true) as IImageCrop;
        setImageDto({...imageDto, crops: {avatar: imageCrop}});
      default:
        props.api.putImage(imageDto, imageFile).then(console.log);
    }
  };

  const onClose = () => {
    setImageDto({entityId: props.entityId, imageKey: ''});
    props.onClose();
  };

  const onFileAdd = ({target}) => {
    setImageFile(target.files[0]);
  };

  const handleFormChange = (change: object) => {
    setImageDto({...imageDto, ...change});
  };

  const renderImage = (): ReactElement<any> => {
    const imageUrl = URL.createObjectURL(imageFile);
    if (props.type !== 'avatar') {
      return <img className="dialog-img" src={imageUrl} alt="No image" />;
    }

    return <Cropper ref={cropper} src={imageUrl} aspectRatio={3 / 4} zoomable={false} />;
  };

  return (
    <Dialog
      title={props.label}
      canOutsideClickClose={false}
      usePortal={false}
      isOpen={props.isOpen}
      onClose={onClose}
      className="image-add-dialog"
    >
      <div className={Classes.DIALOG_BODY}>
        <ElementsForm
          formStructure={props.type === 'conditional' ? conditionalStructure : defaultStructure}
          onChange={handleFormChange}
        />
        <FileInput fill text="Choose image" onChange={onFileAdd} />
        {imageFile && renderImage()}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button large intent="warning" onClick={() => console.log(imageDto)}>Test</Button>
          <Button
            large intent="primary"
            loading={LoadingStore.isLoading(POST_LOADING)}
            disabled={!imageFile}
            onClick={clickCreate}>
            Create
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageAddingDialog;
