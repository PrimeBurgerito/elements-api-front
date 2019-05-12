import { Button, ControlGroup, FormGroup, Menu, NumericInput, Popover, Position } from '@blueprintjs/core';
import { IAttribute } from '@type/statistics';
import * as React from 'react';
import { store, view } from 'react-easy-state';
import './element.scss';

interface IAttributesInputProps {
  id?: string;
  attributes: IAttribute[];
  onChange: (attributes: { [k: string]: number }) => void;
}

interface IAttributeStore {
  addedAttributes: { [k: string]: number };
  attributes: IAttribute[];
  newValue: number;
  selected: IAttribute;
}

const AttributesInput = (props: IAttributesInputProps): JSX.Element => {
  const localStore = store<IAttributeStore>({
    addedAttributes: {},
    attributes: [...props.attributes],
    newValue: 0,
    selected: null,
  });

  const onAttributeChange = () => {
    props.onChange(localStore.addedAttributes);
  };

  const renderAttributeChanger = (attrKey: string) => {
    const changeHandler = (value: number) => {
      localStore.addedAttributes[attrKey] = value;
      onAttributeChange();
    };

    const attr = props.attributes.find((a) => a.id === attrKey);
    return (
      <FormGroup className="statistic-changer" label={attr.name} labelFor={attr.id} key={`${attrKey}-for-group`}>
        <NumericInput min={attr.min} max={attr.max} key={`attr-value-${attr.id}`} id={attr.id}
                      value={localStore.addedAttributes[attrKey]} onValueChange={changeHandler} />
      </FormGroup>
    );
  };

  const renderAttributeSelector = () => {
    const addAttribute = () => {
      localStore.addedAttributes[localStore.selected.id] = localStore.newValue;
      localStore.attributes = localStore.attributes.filter((attr) => attr.id !== localStore.selected.id);
      localStore.selected = null;
      localStore.newValue = 0;
      onAttributeChange();
    };

    const renderAttributeMenu = () => {
      const onClick = (attr: IAttribute) => {
        localStore.newValue = attr.min;
        localStore.selected = attr;
      };

      return (
        <Menu>
          {localStore.attributes.map((attr: IAttribute, idx) =>
            <Menu.Item key={`attr-select-${attr.id}-${idx}`} text={attr.name} onClick={() => onClick(attr)} />)}
        </Menu>
      );
    };

    return (
      <ControlGroup id={props.id}>
        <Popover content={renderAttributeMenu()} position={Position.BOTTOM}>
          <Button text={localStore.selected ? localStore.selected.name : 'Attributes'} rightIcon="caret-down" />
        </Popover>
        <NumericInput disabled={!localStore.selected} value={localStore.newValue}
                      onValueChange={(value) => localStore.newValue = value}
                      min={!!localStore.selected ? localStore.selected.min : 0}
                      max={!!localStore.selected ? localStore.selected.max : 100} />
        <Button onClick={addAttribute} disabled={!localStore.selected} text="Add" rightIcon="arrow-right"
                intent="success" />
      </ControlGroup>
    );
  };

  return (
    <>
      {renderAttributeSelector()}
      {Object.keys(localStore.addedAttributes).map(renderAttributeChanger)}
    </>
  );
};

export default view(AttributesInput);
