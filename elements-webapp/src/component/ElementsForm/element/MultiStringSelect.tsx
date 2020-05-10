import { MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import * as React from 'react';
import { useEffect, useState } from 'react';

type Props = {
  selectableValues: string[];
  values?: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
};

const MultiStringSelect: React.FC<Props> = (props) => {
  const allValues = [...new Set(props.selectableValues)];
  const [selected, setSelected] = useState([]);
  const StringSelect = MultiSelect.ofType<string>();

  useEffect(() => {
    if (props.values) {
      setSelected(props.values);
    }
  }, [props.values]);

  const valueRenderer: ItemRenderer<string> = (value, {modifiers, handleClick}) => {
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

  const handleValueSelect = (value: string): void => {
    const newSelected = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    setSelected(newSelected);
    props.onChange(newSelected);
  };

  return <StringSelect
    className="string-multi-select"
    items={allValues}
    tagRenderer={(name) => name}
    itemRenderer={valueRenderer}
    selectedItems={selected}
    onItemSelect={handleValueSelect}
    noResults={<MenuItem disabled={true} text="No results." />}
  />;

};

export default MultiStringSelect;
