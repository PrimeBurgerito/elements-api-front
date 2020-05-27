import { Card, Divider, FormGroup, H1 } from '@blueprintjs/core';
import { chooseFieldByType } from '@component/ElementsForm/element/FormElementFields';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { FormComponentProps, FormElementType, IElementsFormProps, } from './ElementsFormResource';


const ElementsForm = <T extends object>(props: IElementsFormProps<T>): React.ReactElement => {
  const [formState, setFormState] = useState<T>(() => ({}) as any);

  useEffect(() => {
    props.onChange(formState);
  }, []);

  useEffect(() => {
    if (props.formValue) {
      setFormState(props.formValue);
    }
  }, [props.formValue]);

  const onChange = (key: string, change) => {
    const newFormState = {
      ...formState,
      [key]: change,
    };
    setFormState(newFormState);
    props.onChange(newFormState);
  };

  const getFormField = <F extends FormElementType>([key, formElement]: [string, FormComponentProps]): React.ReactElement => {
    return (
      <div key={`${key}-form-group`}>
        <FormGroup label={formElement.label} labelFor={key}>
          {chooseFieldByType(key, formElement, onChange, formState)}
        </FormGroup>
        <Divider />
      </div>
    );
  };

  const memoizedForm = useMemo(() => Object.entries(props.formStructure.formElements).map<React.ReactElement>(getFormField), [formState]);

  return (
    <Card>
      {!!props.label && <H1>{props.label}</H1>}
      {memoizedForm}
    </Card>
  );
};

export default ElementsForm;
