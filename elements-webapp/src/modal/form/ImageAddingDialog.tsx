import { Button, Classes, Dialog, FileInput } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import BaseApi from '@shared/api/BaseApi';
import { POST_LOADING } from '@shared/api/request-template/requests';
import { LoadingStore } from '@shared/store/LoadingStore';
import * as React from 'react';
import { useState } from 'react';
import './imageAddingDialog.scss';

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

interface IImageAddingDialogProps {
  entityId: string;
  isOpen: boolean;
  label: string;
  type: 'default' | 'conditional';
  onClose: () => void;
  onSuccess?: (res: any) => void;
  api: BaseApi;
}

const ImageAddingDialog = (props: IImageAddingDialogProps): JSX.Element => {
  const [imageDto, setImageDto] = useState({ entityId: props.entityId, imageKey: '' });
  const [imageFile, setImageFile] = useState(null);

  const clickCreate = () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    if (props.type === 'conditional') {
      formData.append('imageDto', new Blob([JSON.stringify(imageDto)], { type: 'application/json' }));
      props.api.putConditionalImage(formData).then(console.log);
    } else {
      props.api.putImage(imageDto.entityId, imageDto.imageKey, formData).then(console.log);
    }
  };

  const onClose = () => {
    setImageDto({ entityId: props.entityId, imageKey: '' });
    props.onClose();
  };

  const onFileAdd = ({ target }) => {
    setImageFile(target.files[0]);
  };

  const handleFormChange = (change: object) => {
    setImageDto({ ...imageDto, ...change });
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
          formStructure={props.type === 'default' ? defaultStructure : conditionalStructure}
          onChange={handleFormChange}
        />
        <FileInput fill text="Choose image" onChange={onFileAdd} />
        {imageFile && <img className="dialog-img" src={URL.createObjectURL(imageFile)} alt="No image" />}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button large intent="warning" onClick={() => console.log(imageDto)}>Test</Button>
          <Button loading={LoadingStore.isLoading(POST_LOADING)} large intent="primary"
                  onClick={clickCreate}>Create</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageAddingDialog;
