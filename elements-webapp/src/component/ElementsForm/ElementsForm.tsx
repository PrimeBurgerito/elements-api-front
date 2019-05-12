import { Card, Divider, FormGroup, H1, InputGroup, NumericInput } from '@blueprintjs/core';
import { HTMLInputProps } from '@blueprintjs/core/src/common/props';
import AttributesInput from '@component/ElementsForm/element/AttributesInput';
import PropertiesInput from '@component/ElementsForm/element/PropertiesInput';
import * as React from 'react';
import { store, view } from 'react-easy-state';
import {
  FormElementType,
  IElementsFormProps,
  IFormAttribute,
  IFormElement,
  IFormNumeric,
  IFormProperty,
} from './ElementsFormResource';

const ElementsForm = (props: IElementsFormProps): JSX.Element => {
  const localStore = store({
    currentState: {},
  });

  const onChange = (key, change) => {
    localStore.currentState[key] = change;
    console.log(localStore.currentState);
  };

  const getElement = (key: string, formElement: IFormElement): JSX.Element => {
    let input: HTMLInputProps;
    let element;
    switch (formElement.type) {
      case FormElementType.NUMERIC:
        element = formElement as IFormNumeric;
        input =
          <NumericInput id={key} min={element.min} max={element.max} onValueChange={(value) => onChange(key, value)} />;
        break;
      case FormElementType.TEXT:
        input = <InputGroup id={key} onChange={({target}) => onChange(key, target.value)} />;
        break;
      case FormElementType.PROPERTY:
        element = formElement as IFormProperty;
        input = <PropertiesInput id={key} properties={element.properties} onChange={(prop) => onChange(key, prop)} />;
        break;
      case FormElementType.ATTRIBUTE:
        element = formElement as IFormAttribute;
        input = <AttributesInput id={key} attributes={element.attributes} onChange={(attr) => onChange(key, attr)} />;
        break;
    }

    return (
      <>
        <FormGroup key={`${key}-form-group`} label={formElement.label} labelFor={key}>
          {input}
        </FormGroup>
        <Divider />
      </>
    );
  };

  return (
    <Card>
      <H1>{props.label}</H1>
      <form>
        {Object.entries(props.formStructure.formElements).map(([key, elem]) => getElement(key, elem))}
      </form>
    </Card>
  );
};

export default view(ElementsForm);
