import { Button, ControlGroup, FormGroup, Menu, NumericInput, Popover, Position } from '@blueprintjs/core';
import AttributeApi from '@shared/api/statistic/AttributeApi';
import { IAttribute } from '@type/statistics';
import * as React from 'react';
import { useEffect } from 'react';
import { store, view } from 'react-easy-state';
import './element.scss';

interface IAttributesInputProps {
  id?: string;
  onChange: (attributes: { [k: string]: number }) => void;
}

interface IAttributeStore {
  allAttributes: IAttribute[];
  remainingAttr: IAttribute[];
  addedAttributes: { [k: string]: number };
  newValue: number;
  selected: IAttribute;
}

const AttributesInput = (props: IAttributesInputProps): JSX.Element => {
  const localStore = store<IAttributeStore>({
    allAttributes: [],
    remainingAttr: [],
    addedAttributes: null,
    newValue: 0,
    selected: null,
  });

  useEffect(() => {
    new AttributeApi().find().then((res: IAttribute[]) => {
      if (res && res.length) {
        localStore.allAttributes = res;
        localStore.remainingAttr = [...res];
      }
    });
  }, []);

  const onAttributeChange = () => {
    props.onChange(localStore.addedAttributes);
  };

  const renderAttributeSelector = () => {
    const addAttribute = () => {
      if (!localStore.addedAttributes) {
        localStore.addedAttributes = {};
      }
      localStore.addedAttributes[localStore.selected.id] = localStore.newValue;
      localStore.remainingAttr = localStore.remainingAttr.filter((attr) => attr.id !== localStore.selected.id);
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
          {localStore.remainingAttr.map((attr: IAttribute, idx) =>
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

  const renderAttributeChanger = (attrKey: string) => {
    const changeHandler = (value: number) => {
      localStore.addedAttributes[attrKey] = value;
      onAttributeChange();
    };

    const attr = localStore.allAttributes.find((a) => a.id === attrKey);
    return (
      <FormGroup className="statistic-changer" label={attr.name} labelFor={attr.id} key={`${attrKey}-for-group`}>
        <NumericInput min={attr.min} max={attr.max} key={`attr-value-${attr.id}`} id={attr.id}
                      value={localStore.addedAttributes[attrKey]} onValueChange={changeHandler} />
      </FormGroup>
    );
  };

  return (
    <>
      {renderAttributeSelector()}
      {localStore.addedAttributes && Object.keys(localStore.addedAttributes).map(renderAttributeChanger)}
    </>
  );
};

export default view(AttributesInput);
