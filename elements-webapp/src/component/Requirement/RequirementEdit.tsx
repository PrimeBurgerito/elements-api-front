import { H3, H6 } from '@blueprintjs/core';
import RequirementNumericPropertySelect from '@component/FormComponent/NumericPropertySelect/RequirementNumericPropertySelect';
import RequirementStringPropertiesSelect from '@component/FormComponent/StringPropertySelect/RequirementStringPropertiesSelect';
import { useProperties } from '@shared/context/PropertiesContext';
import { IRequirement, IRequirementNumericProperties, IRequirementStringProperties } from '@type/Requirement';
import * as React from 'react';
import { useState } from 'react';

type Props = {
  value: IRequirement;
  onChange: (newValue: IRequirement) => void;
};

const RequirementEdit: React.FC<Props> = props => {
  const properties = useProperties();
  const [requirement, setRequirement] = useState<IRequirement>(props.value);

  const onStringPropertyChange = (stringProperties: IRequirementStringProperties) => {
    const newRequirement = {...requirement, properties: {...requirement.properties, stringProperties}};
    setRequirement(newRequirement);
    props.onChange(newRequirement);
  };

  const onNumericPropertyChange = (numericProperties: IRequirementNumericProperties) => {
    const newRequirement = {...requirement, properties: {...requirement.properties, numericProperties}};
    setRequirement(newRequirement);
    props.onChange(newRequirement);
  };

  return (
    <>
      <H3>Requirements</H3>
      <H6>String properties</H6>
      <RequirementStringPropertiesSelect properties={properties.stringProperties} onChange={onStringPropertyChange} value={{}} />
      <H6>Numeric properties</H6>
      <RequirementNumericPropertySelect properties={properties.numericProperties} onChange={onNumericPropertyChange} value={{}} />
    </>
  );
};

export default RequirementEdit;
