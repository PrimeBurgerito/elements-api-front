import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { IRequirement } from '@type/requirement';
import * as React from 'react';
import { useEffect, useState } from 'react';

const requirementFormStructure: IFormStructure = {
  formElements: {
    locationIds: { label: 'Location', type: FormElementType.LOCATION },
    timing: { label: 'Required timing', type: FormElementType.TIMING },
    properties: { label: 'Required properties', type: FormElementType.PROPERTY },
    attributes: { label: 'Required attributes', type: FormElementType.ATTRIBUTE },
  },
};

interface IRequirementInputProps {
  onChange: (change: IRequirement) => void;
  value?: IRequirement;
}

const RequirementInput = (props: IRequirementInputProps): JSX.Element => {
  const [requirementState, setRequirementState] = useState<IRequirement>(null);

  useEffect(() => {
    if (props.value) {
      setRequirementState(props.value);
    }
  }, [props.value]);

  const handleChange = (change: IRequirement) => {
    setRequirementState(change);
    props.onChange(change);
  };

  return (
    <>
      <ElementsForm
        formValue={requirementState}
        formStructure={requirementFormStructure}
        label="Requirement"
        onChange={handleChange}
      />
    </>
  );
};

export default RequirementInput;
