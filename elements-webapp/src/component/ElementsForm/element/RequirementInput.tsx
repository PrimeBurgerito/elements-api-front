import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { IRequirement } from '@type/requirement';
import * as React from 'react';

const requirementFormStructure: IFormStructure = {
  formElements: {
    timing: { label: 'Required timing', type: FormElementType.TIMING },
    properties: { label: 'Required properties', type: FormElementType.PROPERTY },
    attributes: { label: 'Required attributes', type: FormElementType.ATTRIBUTE },
  },
};

interface IRequirementInputProps {
  onChange: (change: IRequirement) => void;
}

const RequirementInput = (props: IRequirementInputProps): JSX.Element => {

  const handleChange = (change: IRequirement) => {
    props.onChange(change);
  };

  return (
    <>
      <ElementsForm formStructure={requirementFormStructure} label="Requirement" onChange={handleChange} />
    </>
  );
};

export default RequirementInput;
