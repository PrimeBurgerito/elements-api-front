import { Button, Divider, FormGroup } from '@blueprintjs/core';
import { chooseFieldByType } from '@component/ElementsForm/element/FormElementFields';
import { FormElement, FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';

type ArrayInputProps = {
  formStructure: IFormStructure;
  arrayValue?: object[];
  onChange: (formArray: object[]) => void;
};

const ArrayInput = (props: ArrayInputProps): ReactElement<any> => {
  const [formState, setFormState] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    if (props.arrayValue) {
      setFormState(props.arrayValue);
    }
  }, []);

  useEffect(() => {
    if (props.arrayValue) {
      setFormState(props.arrayValue);
    }
  }, [props.arrayValue]);

  const onChange = (index: number) => (key, change) => {
    const newFormState = [...formState];
    newFormState[index][key] = change;
    setFormState(newFormState);
    props.onChange(newFormState);
  };

  const getFormField = (index: number) =>
    <F extends FormElementType>([key, formElement]: [string, FormElement<F>]): ReactElement<any> => {
      return (
        <div key={`${key}-form-group`}>
          <FormGroup label={formElement.label} labelFor={key}>
            {chooseFieldByType(key, formElement, onChange(index), formState[index])}
          </FormGroup>
          <Divider />
        </div>
      );
    };

  return (
    <>
      <Button intent="primary" onClick={() => setForms([...forms, (setFormState([...formState, {}]))])}>Add</Button>
      {formState.map((state, index: number) =>
        Object.entries(props.formStructure.formElements).map<ReactElement<any>>(getFormField(index)))}
    </>
  );
};

export default ArrayInput;
