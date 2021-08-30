import React, { useState } from 'react';
import { Button, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import { IRealmDto } from '@type/Realm';
import useDtoHook from '@shared/hooks/dtoHook';
import RealmApi from '@shared/api/RealmApi';

const REALM_NAME_ID = 'realm-name';
const REALM_ID_ID = 'realm-id';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  afterPost: () => Promise<void>;
}

const RealmCreateDialog: React.FC<Props> = props => {
  const { dto, edit } = useDtoHook<IRealmDto>({
    name: '',
    id: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    await RealmApi.post(dto);
    await props.afterPost();
    setLoading(false);
    props.onClose();
  }

  return (
    <Dialog title="Realm" usePortal={false} isOpen={props.isOpen} onClose={props.onClose}>
      <div className={Classes.DIALOG_BODY}>
        <form>
          <FormGroup label="Name" labelFor={REALM_NAME_ID} labelInfo="(required)">
            <InputGroup id={REALM_NAME_ID} placeholder="Realm name..." value={dto.name} name="name" onChange={edit} />
          </FormGroup>
          <FormGroup label="Name" labelFor={REALM_ID_ID} labelInfo="(required)">
            <InputGroup id={REALM_ID_ID} placeholder="Unique realm id..." value={dto.id} name="id" onChange={edit} />
          </FormGroup>
          <Button text="Create" loading={loading} disabled={!dto.name || !dto.id} onClick={handleSubmit} />
        </form>
      </div>
    </Dialog>
  );
}

export default RealmCreateDialog;
