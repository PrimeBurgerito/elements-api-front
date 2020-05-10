import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { IRequirement } from '@type/Requirement';
import * as React from 'react';
import { useEffect, useState } from 'react';

const requirementFormStructure: IFormStructure<IRequirement> = {
  formElements: {
    locationIds: {label: 'Location', type: FormElementType.LOCATION},
    timing: {label: 'Required timing', type: FormElementType.TIMING},
    properties: {
      label: 'Required properties', type: FormElementType.NESTED, formStructure: {
        formElements: {
          stringProperties: {label: 'String property requirement', type: FormElementType.STRING_PROPERTY},
          numericProperties: {label: 'Numeric property requirement', type: FormElementType.NUMERIC_PROPERTY},
        }
      }
    },
    objectives: {label: 'Required objectives', type: FormElementType.MULTI_SELECT, selectableValues: ['TEST']}
  },
};

type Props = {
  onChange: (change: IRequirement) => void;
  value?: IRequirement;
};

const RequirementInput: React.FC<Props> = (props) => {
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
