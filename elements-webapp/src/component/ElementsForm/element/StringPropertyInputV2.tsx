import { Button, ButtonGroup, MenuItem } from '@blueprintjs/core';
import { IStringProperty, StringPropertyType } from '@type/statistics';
import React, { useState } from 'react';
import './element.scss';
import { ItemRenderer, Select } from '@blueprintjs/select';
import StringSelect from '@component/ElementsForm/element/StringSelect';
import MultiStringSelect from '@component/ElementsForm/element/MultiStringSelect';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';

type Props = {
  initialValue?: Record<string, string[]>;
  allProperties: IStringProperty[];
  onChange: (properties: Record<string, string[]>) => void;
};

const PropertySelect = Select.ofType<IStringProperty>();

const StringPropertyInputV2: React.FC<Props> = props => {
  const [active, setActive] = useState<IStringProperty>(props.allProperties[0])
  const [value, setValue] = useState<Record<string, string[]>>(props.initialValue || {});

  const onValueChange = (newValues: string[]) => {
    const newValue = { ...value, [active.key]: newValues };
    setValue(newValue);
    props.onChange(newValue);
  }

  const renderPropertyValueSelector = (): React.ReactElement => {
    const templateHasProperty = Object.keys(value).includes(active.key);
    if (!templateHasProperty) {
      return <Button
        intent={Intent.SUCCESS}
        icon={IconNames.Add}
        onClick={() => onValueChange([active.possibleValues[0]])}
      />
    }
    const selectedValues = value[active.key];
    if (active.type === StringPropertyType.SINGLE) {
      return <StringSelect
        fill
        selectableValues={active.possibleValues}
        value={selectedValues?.length ? selectedValues[0] : null}
        onChange={newValue => onValueChange([newValue])}
      />
    }
    return <MultiStringSelect
      selectableValues={active.possibleValues}
      values={selectedValues}
      onChange={onValueChange}
    />
  }

  const valueRenderer: ItemRenderer<IStringProperty> = (property: IStringProperty, { modifiers, handleClick }) => {
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
        items={props.allProperties}
        onItemSelect={setActive}>
        <Button fill text={active ? active.name : '(No selection)'} rightIcon="double-caret-vertical" />
      </PropertySelect>
      {renderPropertyValueSelector()}
    </ButtonGroup>
  );
};

export default StringPropertyInputV2;
