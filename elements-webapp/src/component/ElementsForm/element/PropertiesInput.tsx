import { Button, ControlGroup, FormGroup, Menu, Popover, Position } from '@blueprintjs/core';
import PropertyApi from '@shared/api/statistic/PropertyApi';
import { IProperty } from '@type/statistics';
import * as React from 'react';
import { useEffect } from 'react';
import { store, view } from 'react-easy-state';
import './element.scss';

interface IPropertiesForm {
  [k: string]: string;
}

interface IPropertiesInputProps {
  id?: string;
  propertiesValue?: IPropertiesForm;
  onChange: (properties: IPropertiesForm) => void;
}

interface IPropertiesInputStore {
  allProperties: IProperty[];
  remainingProps: IProperty[];
  addedProperties: IPropertiesForm;
  selected: IProperty;
  newValue: string;
}

const PropertiesInput = (props: IPropertiesInputProps): JSX.Element => {
  const localStore = store<IPropertiesInputStore>({
    allProperties: [],
    remainingProps: [],
    addedProperties: null,
    selected: null,
    newValue: null,
  });

  useEffect(() => {
    new PropertyApi().find(true).then((res: IProperty[]) => {
      if (res && res.length) {
        localStore.allProperties = res;
        localStore.remainingProps = [...res];
      }
    });
  }, []);

  useEffect(() => {
    if (props.propertiesValue && localStore.allProperties) {
      localStore.addedProperties = props.propertiesValue;
      if (props.propertiesValue) {
        localStore.remainingProps = localStore.allProperties
          .filter((value) => !Object.keys(props.propertiesValue).includes(value.id));
      }
    }
  }, [props.propertiesValue, localStore.allProperties]);

  const onPropertyChange = (): void => {
    props.onChange(localStore.addedProperties);
  };

  const renderPropertySelector = () => {
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
          <Button rightIcon="double-caret-vertical"
                  text={localStore.newValue ? localStore.newValue : 'Property value'} />
        </Popover>
      );
    };

    const addProperty = () => {
      if (!localStore.addedProperties) {
        localStore.addedProperties = {};
      }
      localStore.addedProperties[localStore.selected.id] = localStore.newValue;
      localStore.remainingProps = localStore.remainingProps.filter((prop) => prop.id !== localStore.selected.id);
      localStore.selected = null;
      localStore.newValue = null;
      onPropertyChange();
    };

    const renderPropertyMenu = () => {
      const selectProperty = (prop: IProperty) => {
        localStore.selected = prop;
        localStore.newValue = prop.values[0];
      };

      return (
        <Menu>
          {localStore.remainingProps.map((prop: IProperty, idx) =>
            <Menu.Item key={`prop-select-${prop.id}-${idx}`} text={prop.name} onClick={() => selectProperty(prop)} />)}
        </Menu>
      );
    };

    return (
      <ControlGroup>
        <Popover content={renderPropertyMenu()} position={Position.BOTTOM}>
          <Button
            disabled={!localStore.remainingProps.length}
            text={localStore.selected ? localStore.selected.name : 'Properties'}
            rightIcon="caret-down"
          />
        </Popover>
        {!!localStore.selected && renderNewPropertyValuesSelector(localStore.selected)}
        <Button
          onClick={addProperty}
          disabled={!localStore.selected}
          text="Add"
          rightIcon="arrow-right"
          intent="success"
        />
      </ControlGroup>
    );
  };

  const renderAddedProperties = () => {
    const renderAddedPropertyValueSelector = (prop: IProperty) => {
      const onClick = (value) => {
        localStore.addedProperties[prop.id] = value;
        onPropertyChange();
      };

      const renderPropertyValues = () =>
        <Menu>
          {prop.values.map((value) =>
            <Menu.Item key={`added-${prop.id}-${value}`} text={value} onClick={() => onClick(value)} />)}
        </Menu>;

      return (
        <Popover content={renderPropertyValues()} position={Position.BOTTOM}>
          <Button id={prop.id} rightIcon="double-caret-vertical" text={localStore.addedProperties[prop.id]} />
        </Popover>
      );
    };

    return Object.keys(localStore.addedProperties).map((key) => {
      const prop: IProperty = localStore.allProperties.find((p) => p.id === key);
      return (
        <FormGroup className="statistic-changer" key={`added-${key}`} labelFor={prop.id} label={prop.name}>
          {renderAddedPropertyValueSelector(prop)}
        </FormGroup>
      );
    });
  };

  return (
    <>
      {renderPropertySelector()}
      {localStore.allProperties.length && localStore.addedProperties && renderAddedProperties()}
    </>
  );
};

export default view(PropertiesInput);
