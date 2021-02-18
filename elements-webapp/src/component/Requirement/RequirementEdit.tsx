import { H3, H6 } from '@blueprintjs/core';
import RequirementStringPropertiesSelect from '@component/FormComponent/StringPropertySelect/RequirementStringPropertiesSelect';
import { useProperties } from '@shared/context/PropertiesContext';
import { IRequirement, IRequirementStringProperties } from '@type/Requirement';
import * as React from 'react';
import { useState } from 'react';

type Props = {
  value: IRequirement;
  onChange: (newValue: IRequirement) => void;
};

const RequirementEdit: React.FC<Props> = props => {
  const properties = useProperties();
  const [] = useState<IRequirement>(props.value);

  const onStringPropertyChange = (newValue: IRequirementStringProperties) => {
    console.log(newValue);
  };

  return (
    <>
      <H3>Requirements</H3>
      <H6>String properties</H6>
      <RequirementStringPropertiesSelect properties={properties.stringProperties} onChange={onStringPropertyChange} value={{}} />
    </>
  );
};

export default RequirementEdit;
