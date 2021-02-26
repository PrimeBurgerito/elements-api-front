import { Button, ControlGroup, FormGroup, Menu, Popover, Position } from '@blueprintjs/core';
import { IMenuProps } from '@blueprintjs/core/src/components/menu/menu';
import { IPopoverProps } from '@blueprintjs/core/src/components/popover/popover';
import stringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import { IStringProperty } from '@type/statistics';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import './element.scss';

interface IPropertiesForm {
  [k: string]: string[];
}

type Props = {
  id?: string;
  initialValue?: IPropertiesForm;
  onChange: (properties: IPropertiesForm) => void;
};

type PropertySelectorProps = {
  properties: ReadonlyArray<IStringProperty>;
  onSelect: (property: IStringProperty) => void;
};

const PropertySelector: React.FC<PropertySelectorProps> = props => {
  const [selected, setSelected] = useState<IStringProperty>(null);

  const renderNewPropertyValuesSelector = (): React.ReactElement<IPopoverProps> => {
    const onClick = (value: string) => {
      setSelected({...selected, value: [value]});
    };

    const renderPropertyValues = (): React.ReactElement =>
      <Menu>
        {selected.possibleValues.map((value: string, index: number) =>
          <Menu.Item key={`prop-value-${selected.key}-${index}`} text={value} onClick={() => onClick(value)} />)}
      </Menu>;

    return (
      <Popover content={renderPropertyValues()} position={Position.BOTTOM}>
        <Button rightIcon="double-caret-vertical" text={selected?.value || 'Property value'} />
      </Popover>
    );
  };

  const addProperty = () => {
    props.onSelect(selected);
    setSelected(null);
  };

  const renderPropertyMenu = (): React.ReactElement<IMenuProps> => {
    const selectProperty = (prop: IStringProperty) => setSelected({...prop, value: [prop.possibleValues[0]]});

    return (
      <Menu>
        {props.properties.map((prop: IStringProperty) =>
          <Menu.Item key={`prop-select-${prop.key}`} text={prop.name} onClick={() => selectProperty(prop)} />)}
      </Menu>
    );
  };

  return (
    <ControlGroup>
      <Popover content={renderPropertyMenu()} position={Position.BOTTOM}>
        <Button disabled={!props?.properties?.length} text={selected?.name || 'Properties'} rightIcon="caret-down" />
      </Popover>
      {selected && renderNewPropertyValuesSelector()}
      <Button onClick={addProperty} disabled={!selected} text="Add" rightIcon="arrow-right" intent="success" />
    </ControlGroup>
  );
};

// TODO: support for SINGLE and MULTIPLE properties
const StringPropertyInput: React.FC<Props> = props => {
  const [inputValue, setInputValue] = useState<IPropertiesForm>(props.initialValue);

  const [properties, setProperties] = useState<IStringProperty[]>([]);
  const [unusedProperties, usedProperties] = useMemo<[IStringProperty[], IStringProperty[]]>(() => {
    return properties.reduce<[IStringProperty[], IStringProperty[]]>(([unused, used], next) => {
      const isSelected = inputValue && Object.keys(inputValue).includes(next.key);
      return isSelected ? [unused, [...used, next]] : [[...unused, next], used];
    }, [[], []]);
  }, [inputValue, properties]);

  useEffect(() => {
    props.onChange(inputValue);
  }, [inputValue]);

  useEffect(() => {
    stringPropertyApi.find().then((res: IStringProperty[]) => setProperties(res));
  }, []);

  const renderPropertyChanger = (prop: IStringProperty) => {
    const onClick = (newValue: string) => setInputValue({...inputValue, [prop.key]: [newValue]});
    const menuItem = (value: string) => <Menu.Item key={`added-${prop.key}-${value}`} text={value} onClick={() => onClick(value)} />;

    return (
      <FormGroup className="statistic-changer" key={`added-${prop.key}`} labelFor={prop.key} label={prop.name}>
        <Popover content={<Menu>{prop.possibleValues.map(menuItem)}</Menu>} position={Position.BOTTOM}>
          <Button id={prop.key} rightIcon="double-caret-vertical" text={inputValue[prop.key]} />
        </Popover>
      </FormGroup>
    );
  };

  const onPropertySelect = (property: IStringProperty) => {
    setInputValue(!inputValue ? {[property.key]: property.value} : {...inputValue, [property.key]: property.value});
  };

  return (
    <>
      <PropertySelector properties={unusedProperties} onSelect={onPropertySelect} />
      {usedProperties.map(renderPropertyChanger)}
    </>
  );
};

export default StringPropertyInput;
