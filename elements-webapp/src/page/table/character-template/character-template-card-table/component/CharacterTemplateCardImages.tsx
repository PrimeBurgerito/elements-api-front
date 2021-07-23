import React, { useMemo, useState } from 'react';
import { IImage } from '@type/image';
import { Button, ButtonGroup, Callout, H5, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { MEDIA_URL } from '@constant/paths';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';

type Props = {
  images: Record<string, IImage>;
}

const ImageSelect = Select.ofType<IImage>();

const CharacterTemplateCardImages: React.FC<Props> = props => {
  const [selected, setSelected] = useState<IImage>(Object.values(props.images)[0]);

  const imageList: IImage[] = useMemo(() => {
    return props.images ? Object.values(props.images) : [];
  }, [props.images]);

  const valueRenderer: ItemRenderer<IImage> = ({ key }, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return <MenuItem active={modifiers.active} key={`menu-item-${key}`} text={key} onClick={handleClick} />;
  };

  return (
    <Callout className="c-item-image">
      <H5>Images
        <ButtonGroup style={{ float: 'right' }}>
          <Button intent={Intent.SUCCESS} icon={IconNames.ADD} />
          <Button
            intent={Intent.DANGER}
            icon={IconNames.TRASH}
            disabled={!imageList.length}
          />
          <ImageSelect filterable={false} itemRenderer={valueRenderer} items={imageList} onItemSelect={setSelected}>
            <Button text={selected ? selected.key : '(No selection)'} rightIcon="double-caret-vertical" />
          </ImageSelect>
        </ButtonGroup>
      </H5>
      <div className="character-template-image-container">
        <div className="character-template-image">
          {selected && <img src={`${MEDIA_URL}/${selected.fileName}`} alt="None" />}
        </div>
      </div>
    </Callout>
  );
}

export default CharacterTemplateCardImages;
