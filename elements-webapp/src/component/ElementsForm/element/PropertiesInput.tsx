import { Button, ControlGroup, FormGroup, Menu, Popover, Position } from '@blueprintjs/core';
import { IProperty } from '@type/statistics';
import * as React from 'react';
import { store, view } from 'react-easy-state';
import './element.scss';

interface IPropertiesInputProps {
  id?: string;
  properties: IProperty[];
  onChange: (properties: { [k: string]: string }) => void;
}

interface IPropertiesInputStore {
  addedProperties: { [k: string]: string };
  newValue: string;
  properties: IProperty[];
  selected: IProperty;
}

const PropertiesInput = (props: IPropertiesInputProps): JSX.Element => {
  const localStore = store<IPropertiesInputStore>({
    addedProperties: {},
    newValue: null,
    properties: [...props.properties],
    selected: null,
  });

  const onPropertyChange = (): void => {
    props.onChange(localStore.addedProperties);
  };

  const renderNewPropertyValuesSelector = (prop: IProperty) => {
    const onClick = (value: string) => {
      localStore.newValue = value;
    };

    const renderPropertyValues = () =>
      <Menu>
        {prop.values.map((value, idx) =>
          <Menu.Item key={`prop-value-${prop.id}-${idx}`} text={value} onClick={() => onClick(value)} />)}
      </Menu>;

    return (
      <Popover content={renderPropertyValues()} position={Position.BOTTOM}>
        <Button rightIcon="double-caret-vertical" text={localStore.newValue ? localStore.newValue : 'Property value'} />
      </Popover>
    );
  };

  const renderOldPropertyValuesSelector = (prop: IProperty, propIndex: number) => {
    const onClick = (value) => {
      localStore.addedProperties[prop.id] = value;
      onPropertyChange();
    };

    const renderPropertyValues = () =>
      <Menu>
        {prop.values.map((value, idx) =>
          <Menu.Item key={`prop-value-old-${prop.id}-${propIndex}-${idx}`} text={value}
                     onClick={() => onClick(value)} />)}
      </Menu>;

    return (
      <Popover content={renderPropertyValues()} position={Position.BOTTOM}>
        <Button id={prop.id} rightIcon="double-caret-vertical"
                text={localStore.addedProperties[prop.id]} />
      </Popover>
    );
  };

  const renderPropertySelector = () => {
    const addProperty = () => {
      localStore.addedProperties[localStore.selected.id] = localStore.newValue;
      localStore.properties = localStore.properties.filter((prop) => prop.id !== localStore.selected.id);
      localStore.selected = null;
      localStore.newValue = null;
      onPropertyChange();
    };

    const renderPropertyMenu = () => {
      const onClick = (prop: IProperty) => {
        localStore.selected = prop;
        localStore.newValue = prop.values[0];
      };

      return (
        <Menu>
          {localStore.properties.map((prop: IProperty, idx) =>
            <Menu.Item key={`prop-select-${prop.id}-${idx}`} text={prop.name} onClick={() => onClick(prop)} />)}
        </Menu>
      );
    };

    return (
      <ControlGroup>
        <Popover content={renderPropertyMenu()} position={Position.BOTTOM}>
          <Button text={localStore.selected ? localStore.selected.name : 'Properties'} rightIcon="caret-down" />
        </Popover>
        {!!localStore.selected && renderNewPropertyValuesSelector(localStore.selected)}
        <Button onClick={addProperty} disabled={!localStore.selected} text="Add" rightIcon="arrow-right"
                intent="success" />
      </ControlGroup>
    );
  };

  return (
    <>
      {renderPropertySelector()}
      {Object.keys(localStore.addedProperties)
        .map((key, idx) => {
          const prop: IProperty = props.properties.find((p) => p.id === key);

          return (
            <FormGroup className="statistic-changer" key={`form-group-${key}-${idx}`} labelFor={prop.id}
                       label={prop.name}>
              {renderOldPropertyValuesSelector(prop, idx)}
            </FormGroup>
          );
        })}
    </>
  );
};

export default view(PropertiesInput);
