import { Button, ButtonGroup, MenuItem, NumericInput } from '@blueprintjs/core';
import { INumericProperty } from '@type/statistics';
import React, { useState } from 'react';
import './element.scss';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';

type Props = {
  initialValue?: Record<string, number>;
  allProperties: ReadonlyArray<INumericProperty>;
  onChange: (properties: Record<string, number>) => void;
};

const PropertySelect = Select.ofType<INumericProperty>();

const NumericPropertyInputV2: React.FC<Props> = props => {
  const [active, setActive] = useState<INumericProperty>(props.allProperties[0])
  const [value, setValue] = useState<Record<string, number>>(props.initialValue || {});

  const onValueChange = (newValue: number) => {
    const newProp = { ...value, [active.key]: newValue };
    setValue(newProp);
    props.onChange(newProp);
  }

  const renderPropertyValueSelector = (): React.ReactElement => {
    if (!Object.keys(value).includes(active.key)) {
      return <Button
        intent={Intent.SUCCESS}
        icon={IconNames.Add}
        onClick={() => onValueChange(active.min)}
      />
    }
    const selectedPropValue = value[active.key];
    return <NumericInput value={selectedPropValue} onValueChange={onValueChange} min={active.min} max={active.max} />
  }

  const valueRenderer: ItemRenderer<INumericProperty> = (property: INumericProperty, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return <MenuItem
      active={modifiers.active}
      key={`menu-item-${property.key}`}
      text={property.name}
      label={value[property.key] ? '✔' : ''}
      onClick={handleClick} />;
  };

  return (
    <ButtonGroup fill>
      <PropertySelect
        filterable={false}
        itemRenderer={valueRenderer}
        items={props.allProperties as INumericProperty[]}
        onItemSelect={setActive}>
        <Button fill text={active ? active.name : '(No selection)'} rightIcon="double-caret-vertical" />
      </PropertySelect>
      {renderPropertyValueSelector()}
    </ButtonGroup>
  );
};

export default NumericPropertyInputV2;
