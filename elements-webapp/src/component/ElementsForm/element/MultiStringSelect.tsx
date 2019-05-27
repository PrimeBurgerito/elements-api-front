import { MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import * as React from 'react';
import { useState } from 'react';

interface IMultiStringSelectProps {
  values: string[];
  onChange: (values: string[]) => void;
}

const MultiStringSelect = (props: IMultiStringSelectProps): JSX.Element => {
  const allValues = [...new Set(props.values)];
  const [selected, setSelected] = useState([]);
  const StringSelect = MultiSelect.ofType<string>();

  const valueRenderer: ItemRenderer<string> = (value, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={selected.includes(value) ? 'tick' : 'blank'}
        key={`menu-item-${value}`}
        text={value}
        onClick={handleClick}
      />
    );
  };

  const handleValueSelect = (value: string) => {
    const newSelected = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    setSelected(newSelected);
    props.onChange(newSelected);
  };

  return <StringSelect
    items={allValues}
    tagRenderer={(name) => name}
    itemRenderer={valueRenderer}
    selectedItems={selected}
    onItemSelect={handleValueSelect}
    noResults={<MenuItem disabled={true} text="No results." />}
  />;

};

export default MultiStringSelect;
