import { Button, Classes, Dialog } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { POST_LOADING } from '@shared/api/request-template/requests';
import { LoadingStore } from '@shared/store/LoadingStore';
import React, { useState } from 'react';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';

interface IEntityFormDialogProps {
  isOpen: boolean;
  label: string;
  formStructure: IFormStructure;
  onClose: () => void;
  onSuccess?: (res: any) => void;
  api: RealmDocumentApi;
}

const EntityFormDialog = (props: IEntityFormDialogProps): JSX.Element => {
  const [formState, setFormState] = useState({});

  const clickCreate = () => {
    props.api.post(formState).then((res) => {
      if (res && props.onSuccess) {
        props.onSuccess(res);
      }
    });
  };

  const onClose = () => {
    setFormState({});
    props.onClose();
  };

  const onChange = (form: object) => {
    setFormState(form);
  };

  return (
    <Dialog title={props.label} canOutsideClickClose={false} usePortal={false} isOpen={props.isOpen} onClose={onClose}>
      <div className={Classes.DIALOG_BODY}>
        <ElementsForm formStructure={props.formStructure} onChange={onChange} />
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

export default EntityFormDialog;
