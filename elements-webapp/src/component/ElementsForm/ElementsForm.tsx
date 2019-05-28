import { Card, Divider, FormGroup, H1, InputGroup, NumericInput, TagInput } from '@blueprintjs/core';
import { HTMLInputProps } from '@blueprintjs/core/src/common/props';
import AttributesInput from '@component/ElementsForm/element/AttributesInput';
import MultiStringSelect from '@component/ElementsForm/element/MultiStringSelect'
import PropertiesInput from '@component/ElementsForm/element/PropertiesInput';
import RequirementInput from '@component/ElementsForm/element/RequirementInput'
import TimingInput from '@component/ElementsForm/element/TimingInput'
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  FormElementType,
  IElementsFormProps,
  IFormAttribute,
  IFormElement,
  IFormMultiSelect,
  IFormNumeric,
  IFormProperty,
} from './ElementsFormResource';

const ElementsForm = (props: IElementsFormProps): JSX.Element => {
  const [formState, setFormState] = useState(() => ({}));

  useEffect(() => {
    props.onChange(formState);
  }, []);

  const onChange = (key, change) => {
    const newFormState = {
      ...formState,
      [key]: change,
    };
    setFormState(newFormState);
    props.onChange(newFormState);
    console.log(newFormState);
  };

  const getElement = (key: string, formElement: IFormElement): JSX.Element => {
    let input: HTMLInputProps;
    let element;
    switch (formElement.type) {
      case FormElementType.NUMERIC:
        element = formElement as IFormNumeric;
        input =
          <NumericInput
            id={key}
            min={element.min}
            max={element.max}
            value={formState[key] || 0}
            onValueChange={(value) => onChange(key, value)}
          />;
        break;

      case FormElementType.TEXT:
        input =
          <InputGroup
            id={key}
            value={formState[key] || ''}
            onChange={({ target }) => onChange(key, target.value)}
          />;
        break;

      case FormElementType.TAG:
        input =
          <TagInput
            values={formState[key] || []}
            onChange={(values: string[]) => onChange(key, values)}
          />;
        break;

      case FormElementType.PROPERTY:
        element = formElement as IFormProperty;
        input = <PropertiesInput id={key} onChange={(prop) => onChange(key, prop)} />;
        break;

      case FormElementType.ATTRIBUTE:
        element = formElement as IFormAttribute;
        input = <AttributesInput id={key} onChange={(attr) => onChange(key, attr)} />;
        break;

      case FormElementType.MULTISELECT:
        element = formElement as IFormMultiSelect;
        input = <MultiStringSelect values={element.values} onChange={(values) => onChange(key, values)} />;
        break;

      case FormElementType.TIMING:
        input = <TimingInput onChange={(values) => onChange(key, values)} />;
        break;

      case FormElementType.REQUIREMENT:
        input = <RequirementInput onChange={(values) => onChange(key, values)} />;
        break;
    }

    return (
      <div key={`${key}-form-group`}>
        <FormGroup label={formElement.label} labelFor={key}>
          {input}
        </FormGroup>
        <Divider />
      </div>
    );
  };

  return (
    <Card>
      {!!props.label && <H1>{props.label}</H1>}
      {Object.entries(props.formStructure.formElements).map(([key, elem]) => getElement(key, elem))}
    </Card>
  );
};

export default ElementsForm;
