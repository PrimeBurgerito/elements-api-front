import { Button, Card } from '@blueprintjs/core';
import { ICharacterTemplateCreate } from '@type/Character';
import React, { useState } from 'react';
import CharacterTemplateCardProperties from './CharacterTemplateCardProperties';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';
import { characterTemplateRealmApi } from '@shared/api/CharacterTemplateApi';
import { errorNotice } from '@shared/notice/notices';

type Props = {
  onCreate: () => void;
}

const CharacterTemplateCreateCard: React.FC<Props> = props => {
  const [dirty, setDirty] = useState(false);
  const [creating, setCreating] = useState(false);
  const [value, setValue] = useState<ICharacterTemplateCreate>({
    numericProperties: {},
    stringProperties: {},
  });


  const onPropsChange = (newProps: ICharacterTemplateCreate) => {
    setValue(newProps);
    if (!dirty) {
      setDirty(true);
    }
  }

  const onCreate = async () => {
    setCreating(true);
    const updatedValue = await characterTemplateRealmApi.post(value);
    if (updatedValue) {
      props.onCreate();
    } else {
      errorNotice('Character template creation failed!');
    }
    setValue({
      numericProperties: {},
      stringProperties: {},
    })
    setCreating(false);
    setDirty(false);
  }

  return (
    <Card className="c-item-new">
      <CharacterTemplateCardProperties properties={value} onChange={onPropsChange} />
      <Button disabled={!dirty} loading={creating} intent={Intent.SUCCESS} icon={IconNames.Plus} onClick={onCreate} />
    </Card>
  );
}

export default CharacterTemplateCreateCard;
