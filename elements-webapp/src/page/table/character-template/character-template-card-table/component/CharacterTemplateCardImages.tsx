import React, { useMemo } from 'react';
import { IImage } from '@type/image';
import { Button, ButtonGroup, Callout, H5, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { MEDIA_URL } from '@constant/paths';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';
import CharacterTemplateImageAdd from './CharacterTemplateImageAdd';
import { useToggle } from '@shared/hooks/toggleHook';
import { CharacterTemplateV2Api } from '@shared/api/CharacterTemplateApi';
import { useRecordSelectHook } from '@shared/hooks/recordSelectHook';

type Props = {
  entityId: string,
  images: Record<string, IImage>;
}

const ImageSelect = Select.ofType<IImage>();

const CharacterTemplateCardImages: React.FC<Props> = props => {
  const recordState = useRecordSelectHook<IImage>(props.images);
  const [imageAddOpen, toggleImageAdd] = useToggle(false);

  const imageList: IImage[] = useMemo(() => {
    return Object.values(recordState.record);
  }, [recordState.record]);

  const valueRenderer: ItemRenderer<IImage> = ({ key }, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return <MenuItem active={modifiers.active} key={`menu-item-${key}`} text={key} onClick={handleClick} />;
  };

  const onRemove = () => {
    const key = recordState.selected.key;
    const success = CharacterTemplateV2Api.removeImage(props.entityId, key);
    if (success) {
      recordState.remove(key, true)
    }
  }

  const onAdd = (img: IImage) => {
    recordState.set(img.key, img, true);
  }

  return (
    <Callout className="c-item-image">
      <H5>Images
        <ButtonGroup style={{ float: 'right' }}>
          <Button intent={Intent.SUCCESS} icon={IconNames.Add} onClick={toggleImageAdd} />
          <Button
            intent={Intent.DANGER}
            icon={IconNames.Trash}
            disabled={!imageList.length}
            onClick={onRemove}
          />
          <ImageSelect
            filterable={false}
            itemRenderer={valueRenderer}
            items={imageList}
            onItemSelect={item => recordState.select(item.key)}
          >
            <Button
              text={recordState.selected ? recordState.selected.key : '(No selection)'}
              rightIcon="double-caret-vertical"
            />
          </ImageSelect>
        </ButtonGroup>
      </H5>
      <div className="image">
        {recordState.selected && <img src={`${MEDIA_URL}/${recordState.selected.fileName}`} alt="None" />}
      </div>
      <CharacterTemplateImageAdd
        open={imageAddOpen}
        onClose={toggleImageAdd}
        entityId={props.entityId}
        onAdd={onAdd}
      />
    </Callout>
  );
}

export default CharacterTemplateCardImages;
