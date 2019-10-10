import { Card, Divider, FormGroup, H1 } from '@blueprintjs/core';
import { chooseFieldByType } from '@component/ElementsForm/element/FotmElementFields'
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { FormElement, FormElementType, IElementsFormProps, } from './ElementsFormResource';


const ElementsForm = <T extends object>(props: IElementsFormProps<T>): ReactElement<any> => {
  const [formState, setFormState] = useState<T>(() => ({}) as any);

  useEffect(() => {
    props.onChange(formState);
  }, []);

  useEffect(() => {
    if (props.formValue) {
      setFormState(props.formValue);
    }
  }, [props.formValue]);

  const onChange = (key, change) => {
    const newFormState = {
      ...formState,
      [key]: change,
    };
    setFormState(newFormState);
    props.onChange(newFormState);
    console.log(newFormState);
  };

  const getFormField = <F extends FormElementType>([key, formElement]: [string, FormElement<F>]): ReactElement<any> => {
    return (
      <div key={`${key}-form-group`}>
        <FormGroup label={formElement.label} labelFor={key}>
          {chooseFieldByType(key, formElement, onChange, formState)}
        </FormGroup>
        <Divider />
      </div>
    );
  };

  return (
    <Card>
      {!!props.label && <H1>{props.label}</H1>}
      {Object.entries(props.formStructure.formElements).map<ReactElement<any>>(getFormField)}
    </Card>
  );
};

export default ElementsForm;
