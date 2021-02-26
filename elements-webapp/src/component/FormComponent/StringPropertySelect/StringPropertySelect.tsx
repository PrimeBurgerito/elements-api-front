import { MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { useMultiToggleHook } from '@shared/hooks/multiToggleHook';
import { IStringProperty, StringPropertyType } from '@type/statistics';
import React from 'react';

type Props = {
  property: IStringProperty,
  selected: string[],
  onChange: (newValue: IStringProperty) => void,
};

const StringPropertySelectTypes = MultiSelect.ofType<string>();
const StringPropertySelect: React.FC<Props> = props => {
  const {selected, toggle, setValue} = useMultiToggleHook<string>(props.selected);

  const valueRenderer: ItemRenderer<string> = (property, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={selected.includes(property) ? 'tick' : 'blank'}
        key={`string-prop-value-menu-item-${property}`}
        text={property}
        onClick={handleClick}
      />
    );
  };

  const onChange = (value: string) => {
    const newSelection = props.property.type === StringPropertyType.MULTIPLE ? toggle(value) : setValue(value);
    props.onChange({...props.property, value: newSelection});
  };

  return (
    <StringPropertySelectTypes
      items={[...new Set(props.property.possibleValues)]}
      tagRenderer={p => p}
      itemRenderer={valueRenderer}
      selectedItems={selected}
      onItemSelect={onChange}
    />
  );
};

export default StringPropertySelect;
