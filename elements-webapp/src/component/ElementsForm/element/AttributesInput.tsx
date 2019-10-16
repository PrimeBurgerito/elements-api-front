import { Button, ControlGroup, FormGroup, Menu, NumericInput, Popover, Position } from '@blueprintjs/core';
import AttributeApi from '@shared/api/statistic/AttributeApi';
import { IAttribute } from '@type/statistics';
import * as React from 'react';
import { useEffect } from 'react';
import { store, view } from 'react-easy-state';
import './element.scss';

interface IAttributesInputProps {
  id?: string;
  attributesValue?: { [k: string]: number };
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
    new AttributeApi().find(true).then((res: IAttribute[]) => {
      if (res && res.length) {
        localStore.allAttributes = res;
        localStore.remainingAttr = [...res];
      }
    });
  }, []);

  useEffect(() => {
    if (props.attributesValue && localStore.allAttributes.length) {
      localStore.addedAttributes = props.attributesValue;
      localStore.remainingAttr = localStore.allAttributes
        .filter((attr) => !Object.keys(props.attributesValue).includes(attr.key));
    }
  }, [props.attributesValue, localStore.allAttributes]);

  const onAttributeChange = () => {
    props.onChange(localStore.addedAttributes);
  };

  const renderAttributeSelector = () => {
    const addAttribute = () => {
      if (!localStore.addedAttributes) {
        localStore.addedAttributes = {};
      }
      localStore.addedAttributes[localStore.selected.key] = localStore.newValue;
      localStore.remainingAttr = localStore.remainingAttr.filter((attr) => attr.key !== localStore.selected.key);
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
      <ControlGroup fill id={props.id}>
        <Popover content={renderAttributeMenu()} position={Position.BOTTOM}>
          <Button text={localStore.selected ? localStore.selected.name : 'Attributes'} rightIcon="caret-down" />
        </Popover>
        <NumericInput disabled={!localStore.selected} value={localStore.newValue}
                      onValueChange={(value) => localStore.newValue = value}
                      min={!!localStore.selected ? localStore.selected.min : 0}
                      max={!!localStore.selected ? localStore.selected.max : 100} />
        <Button onClick={addAttribute} disabled={!localStore.selected} text="Add" intent="success" />
      </ControlGroup>
    );
  };

  const renderAttributeChanger = (attrKey: string) => {
    const changeHandler = (value: number) => {
      localStore.addedAttributes[attrKey] = value;
      onAttributeChange();
    };

    const attr = localStore.allAttributes.find((a) => a.key === attrKey);
    return (
      <FormGroup className="statistic-changer" label={attr.name} labelFor={attr.key} key={`${attrKey}-for-group`}>
        <NumericInput min={attr.min} max={attr.max} key={`attr-value-${attr.key}`} id={attr.key}
                      value={localStore.addedAttributes[attrKey]} onValueChange={changeHandler} />
      </FormGroup>
    );
  };

  return (
    <>
      {renderAttributeSelector()}
      {localStore.allAttributes.length && localStore.addedAttributes &&
      Object.keys(localStore.addedAttributes).map(renderAttributeChanger)}
    </>
  );
};

export default view(AttributesInput);
