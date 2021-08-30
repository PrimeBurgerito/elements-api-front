import { Button, ButtonGroup, Card } from '@blueprintjs/core';
import { ICharacterTemplate, ICharacterTemplateCreate } from '@type/Character';
import React, { useState } from 'react';
import CharacterTemplateCardImages from './CharacterTemplateCardImages';
import CharacterTemplateCardProperties from './CharacterTemplateCardProperties';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';
import { characterTemplateRealmApi } from '@shared/api/CharacterTemplateApi';

type Props = {
  template: ICharacterTemplate;
}

const CharacterTemplateCard: React.FC<Props> = props => {
  const { properties } = props.template;
  const [dirty, setDirty] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [value, setValue] = useState<ICharacterTemplateCreate>({
    numericProperties: properties.numericPropertyKeyToValue,
    stringProperties: properties.stringPropertyKeyToValue,
  });

  const onPropsChange = (newProps: ICharacterTemplateCreate) => {
    setValue(newProps);
    if (!dirty) {
      setDirty(true);
    }
  }

  const onUpdate = async () => {
    setUpdating(true);
    const updatedValue = await characterTemplateRealmApi.put(props.template.id, value);
    setUpdating(false);
    setValue(updatedValue);
  }

  return (
    <Card className="c-item">
      <div>
        <ButtonGroup>
          <Button
            disabled={!dirty}
            intent={Intent.PRIMARY}
            text="Update"
            icon={IconNames.Refresh}
            onClick={onUpdate}
            loading={updating}
          />
          <Button intent={Intent.WARNING} onClick={() => console.log(value)} text="Test" />
        </ButtonGroup>
        <Button intent={Intent.DANGER} icon={IconNames.Trash} loading={updating} style={{ float: 'right' }} />
      </div>
      <CharacterTemplateCardProperties properties={value} onChange={onPropsChange} />
      <CharacterTemplateCardImages images={props.template.images} entityId={props.template.id} />
    </Card>
  );
}

export default CharacterTemplateCard;
