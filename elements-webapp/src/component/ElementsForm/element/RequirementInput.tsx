import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { IRequirement } from '@type/requirement';
import * as React from 'react';
import { useEffect, useState } from 'react';

const requirementFormStructure: IFormStructure = {
  formElements: {
    locationId: { label: 'Location', type: FormElementType.LOCATION },
    timing: { label: 'Required timing', type: FormElementType.TIMING },
    properties: { label: 'Required properties', type: FormElementType.PROPERTY },
    attributes: { label: 'Required attributes', type: FormElementType.ATTRIBUTE },
  },
};

interface IRequirementInputProps {
  onChange: (change: IRequirement) => void;
  initialRequirement?: IRequirement;
}

const RequirementInput = (props: IRequirementInputProps): JSX.Element => {
  const [requirementState, setRequirementState] = useState<IRequirement>(null);

  useEffect(() => {
    if (props.initialRequirement) {
      setRequirementState(props.initialRequirement);
    }
  }, [props.initialRequirement]);

  const handleChange = (change: IRequirement) => {
    setRequirementState(change);
    props.onChange(change);
  };

  return (
    <>
      <ElementsForm
        initialFormState={requirementState}
        formStructure={requirementFormStructure}
        label="Requirement"
        onChange={handleChange}
      />
    </>
  );
};

export default RequirementInput;
