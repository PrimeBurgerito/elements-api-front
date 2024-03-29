import { Button, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import React, { useEffect, useState } from 'react';

type Props = {
  selectableValues: string[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  fill?: boolean;
};

const TypedStringSelect = Select.ofType<string>();
const StringSelect: React.FC<Props> = (props) => {
  const [selected, setSelected] = useState<string>(props.selectableValues[0]);

  useEffect(() => {
    if (props.value) {
      setSelected(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    handleValueSelect(props.value || props.selectableValues[0]);
  }, []);

  const valueRenderer: ItemRenderer<string> = (value: string, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return <MenuItem active={modifiers.active} key={`menu-item-${value}`} text={value} onClick={handleClick} />;
  };

  const handleValueSelect = (value: string): void => {
    setSelected(value);
    props.onChange(value);
  };

  return <TypedStringSelect
    items={props.selectableValues}
    itemRenderer={valueRenderer}
    onItemSelect={handleValueSelect}
    noResults={<MenuItem disabled={true} text="No results." />}
    filterable={false}
  >
    <Button fill={props.fill} text={selected ? selected : '(No selection)'} rightIcon="double-caret-vertical" />
  </TypedStringSelect>;

};

export default StringSelect;
