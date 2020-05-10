import { Button, ControlGroup, FormGroup, Menu, Popover, Position } from '@blueprintjs/core';
import StringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import { IStringProperty } from '@type/statistics';
import * as React from 'react';
import { useEffect } from 'react';
import { store, view } from 'react-easy-state';
import './element.scss';

interface IPropertiesForm {
  [k: string]: string[];
}

type Props = {
  id?: string;
  propertiesValue?: IPropertiesForm;
  onChange: (properties: IPropertiesForm) => void;
};

interface IPropertiesInputStore {
  allProperties: IStringProperty[];
  remainingProps: IStringProperty[];
  addedProperties: IPropertiesForm;
  selected: IStringProperty;
  newValue: string;
}

// TODO: support for SINGLE and MULTIPLE properties
const StringPropertyInput: React.FC<Props> = (props) => {
  const localStore = store<IPropertiesInputStore>({
    allProperties: [],
    remainingProps: [],
    addedProperties: null,
    selected: null,
    newValue: null,
  });

  useEffect(() => {
    new StringPropertyApi().find(true).then((res: IStringProperty[]) => {
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
          .filter((value) => !Object.keys(props.propertiesValue).includes(value.key));
      }
    }
  }, [props.propertiesValue, localStore.allProperties]);

  const onPropertyChange = (): void => {
    props.onChange(localStore.addedProperties);
  };

  const renderPropertySelector = () => {
    const renderNewPropertyValuesSelector = (prop: IStringProperty) => {
      const onClick = (value: string) => {
        localStore.newValue = value;
      };

      const renderPropertyValues = () =>
        <Menu>
          {prop.possibleValues.map((value, idx) =>
            <Menu.Item key={`prop-value-${prop.key}-${idx}`} text={value} onClick={() => onClick(value)} />)}
        </Menu>;

      return (
        <Popover content={renderPropertyValues()} position={Position.BOTTOM}>
          <Button rightIcon="double-caret-vertical" text={localStore.newValue ? localStore.newValue : 'Property value'} />
        </Popover>
      );
    };

    const addProperty = () => {
      if (!localStore.addedProperties) {
        localStore.addedProperties = {};
      }
      localStore.addedProperties[localStore.selected.key] = [localStore.newValue];
      localStore.remainingProps = localStore.remainingProps.filter((prop) => prop.key !== localStore.selected.key);
      localStore.selected = null;
      localStore.newValue = null;
      onPropertyChange();
    };

    const renderPropertyMenu = () => {
      const selectProperty = (prop: IStringProperty) => {
        localStore.selected = prop;
        localStore.newValue = prop.possibleValues[0];
      };

      return (
        <Menu>
          {localStore.remainingProps.map((prop: IStringProperty, idx) =>
            <Menu.Item key={`prop-select-${prop.key}-${idx}`} text={prop.name} onClick={() => selectProperty(prop)} />)}
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
    const renderAddedPropertyValueSelector = (prop: IStringProperty) => {
      const onClick = (value) => {
        localStore.addedProperties[prop.key] = value;
        onPropertyChange();
      };

      const renderPropertyValues = () =>
        <Menu>
          {prop.possibleValues.map((value) =>
            <Menu.Item key={`added-${prop.key}-${value}`} text={value} onClick={() => onClick(value)} />)}
        </Menu>;

      return (
        <Popover content={renderPropertyValues()} position={Position.BOTTOM}>
          <Button id={prop.key} rightIcon="double-caret-vertical" text={localStore.addedProperties[prop.key]} />
        </Popover>
      );
    };

    return Object.keys(localStore.addedProperties).map((key) => {
      const prop: IStringProperty = localStore.allProperties.find((p) => p.key === key);
      return (
        <FormGroup className="statistic-changer" key={`added-${key}`} labelFor={prop.key} label={prop.name}>
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

export default view(StringPropertyInput);
