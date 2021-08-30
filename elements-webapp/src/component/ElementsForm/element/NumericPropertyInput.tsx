import {
  Button,
  ControlGroup,
  FormGroup,
  Menu,
  MenuItem,
  MenuProps,
  NumericInput,
  Popover,
  Position
} from '@blueprintjs/core';
import numericPropertyApi from '@shared/api/statistic/NumericPropertyApi';
import { INumericProperty } from '@type/statistics';
import React, { useEffect, useMemo, useState } from 'react';
import './element.scss';

type Props = {
  id?: string;
  allProperties?: ReadonlyArray<INumericProperty>;
  initialValues?: { [k: string]: number };
  onChange: (attributes: { [k: string]: number }) => void;
};

type AttributeSelectorProps = {
  properties: ReadonlyArray<INumericProperty>;
  onSelect: (property: INumericProperty) => void;
  id: string;
};

const AttributeSelector: React.FC<AttributeSelectorProps> = props => {
  const ITEM_KEY = 'attr-select';
  const [selected, setSelected] = useState<INumericProperty | null>(null);

  const addAttribute = () => {
    props.onSelect(selected);
    setSelected(null);
  };

  const onValueChange = (value: number) => setSelected({ ...selected, value });
  const renderAttributeMenu = (): React.ReactElement<MenuProps> => {
    const onClick = (attr: INumericProperty) => {
      setSelected({ ...attr, value: attr.value || attr.min });
    };

    return (
      <Menu>
        {props.properties.map((attr: INumericProperty) =>
          <MenuItem key={`${ITEM_KEY}-${attr.id}`} text={attr.name} onClick={() => onClick(attr)} />
        )}
      </Menu>
    );
  };

  return (
    <ControlGroup fill id={props.id}>
      <Popover content={renderAttributeMenu()} position={Position.BOTTOM}>
        <Button text={selected?.name || 'Attributes'} rightIcon="caret-down" />
      </Popover>
      <NumericInput
        disabled={!selected}
        value={selected?.value}
        onValueChange={onValueChange}
        min={selected?.min || 0}
        max={selected?.max || 100}
      />
      <Button onClick={addAttribute} disabled={!selected} text="Add" intent="success" />
    </ControlGroup>
  );
};

const NumericPropertyInput: React.FC<Props> = props => {
  const [inputValue, setInputValue] = useState<{ [k: string]: number }>(props.initialValues);

  const [properties, setProperties] = useState<ReadonlyArray<INumericProperty>>([]);
  const unusedProperties = useMemo<INumericProperty[]>(() => {
    const usedProperties = inputValue ? Object.keys(inputValue) : [];
    return properties.filter(p => !usedProperties.includes(p.key));
  }, [inputValue, properties]);

  useEffect(() => {
    props.onChange(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (props.allProperties) {
      setProperties(props.allProperties);
    } else {
      numericPropertyApi.find().then((res: ReadonlyArray<INumericProperty>) => {
        if (res?.length) {
          setProperties(res);
        }
      });
    }
  }, []);

  const renderPropertyChanger = (key: string): React.ReactElement => {
    const changeHandler = (newValue: number) => setInputValue({ ...inputValue, [key]: newValue });
    const property: INumericProperty = properties.find((a: INumericProperty) => a.key === key);
    return (
      <FormGroup className="statistic-changer" label={property.name} labelFor={property.key} key={`${key}-for-group`}>
        <NumericInput
          min={property.min}
          max={property.max}
          key={`attr-value-${property.key}`}
          id={property.key}
          value={inputValue[key]}
          onValueChange={changeHandler}
        />
      </FormGroup>
    );
  };

  const onPropertySelect = (property: INumericProperty) => {
    setInputValue(!inputValue ? { [property.key]: property.value } : { ...inputValue, [property.key]: property.value });
  };

  return (
    <>
      <AttributeSelector id={props.id} properties={unusedProperties} onSelect={onPropertySelect} />
      {properties.length && inputValue && Object.keys(inputValue).map(renderPropertyChanger)}
    </>
  );
};

export default NumericPropertyInput;
