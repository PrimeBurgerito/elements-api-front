import { Button, Classes, Dialog, FileInput } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import BaseApi from '@shared/api/BaseApi';
import { POST_LOADING } from '@shared/api/request-template/requests';
import { LoadingStore } from '@shared/store/LoadingStore';
import * as React from 'react';
import { useState } from 'react';
import './imageAddingDialog.scss';

const imageAddingFormStructure: IFormStructure = {
  formElements: {
    requirement: { label: 'Image requirement', type: FormElementType.REQUIREMENT },
  },
};

interface IImageAddingDialogProps {
  isOpen: boolean;
  label: string;
  onClose: () => void;
  onSuccess?: (res: any) => void;
  api: BaseApi;
}

const ImageAddingDialog = (props: IImageAddingDialogProps): JSX.Element => {
  const [formState, setFormState] = useState({});
  const [image, setImage] = useState(null);

  const clickCreate = () => {

  };

  const onClose = () => {
    setFormState({});
    props.onClose();
  };

  const onFileAdd = ({ target }) => {
    setImage(URL.createObjectURL(target.files[0]));
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
        <ElementsForm formStructure={imageAddingFormStructure} onChange={(change) => setFormState(change)} />
        <FileInput fill text="Choose image" onChange={onFileAdd} />
        {image && <img className="dialog-img" src={image} alt="No image" />}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button large intent="warning" onClick={() => console.log(formState)}>Test</Button>
          <Button loading={LoadingStore.isLoading(POST_LOADING)} large intent="primary"
                  onClick={clickCreate}>Create</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageAddingDialog;
