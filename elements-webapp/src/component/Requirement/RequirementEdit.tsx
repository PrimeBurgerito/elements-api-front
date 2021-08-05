import { H3, H6 } from '@blueprintjs/core';
import RequirementNumericPropertySelect
  from '@component/FormComponent/NumericPropertySelect/RequirementNumericPropertySelect';
import RequirementObjectiveSelect from '@component/FormComponent/ObjectivePropertySelect/RequirementObjectiveSelect';
import RequirementStringPropertiesSelect
  from '@component/FormComponent/StringPropertySelect/RequirementStringPropertiesSelect';
import { useData } from '@shared/context/DataContext';
import { IRequirement, IRequirementNumericProperties, IRequirementStringProperties } from '@type/Requirement';
import React, { useState } from 'react';
import LocationIdSelect from '@component/Requirement/LocationIdSelect';

type Props = {
  value: IRequirement;
  onChange: (newValue: IRequirement) => void;
  locations?: boolean,
};

const RequirementEdit: React.FC<Props> = props => {
  const properties = useData();
  const [requirement, setRequirement] = useState<IRequirement>(props.value);

  const onStringPropertyChange = (stringProperties: IRequirementStringProperties) => {
    const newRequirement = { ...requirement, properties: { ...requirement.properties, stringProperties } };
    setRequirement(newRequirement);
    props.onChange(newRequirement);
  };

  const onNumericPropertyChange = (numericProperties: IRequirementNumericProperties) => {
    const newRequirement = { ...requirement, properties: { ...requirement.properties, numericProperties } };
    setRequirement(newRequirement);
    props.onChange(newRequirement);
  };

  const onObjectiveChange = (objectives: string[]) => {
    const newRequirement = { ...requirement, objectives };
    setRequirement(newRequirement);
    props.onChange(newRequirement);
  };

  const onLocationIdChange = (ids: string[]) => {
    const newRequirement: IRequirement = { ...requirement, locationIds: ids }
    setRequirement(newRequirement);
    props.onChange(newRequirement);
  }

  return (
    <>
      <H3>Requirements</H3>
      {props.locations && <LocationIdSelect
        locations={properties.locations}
        locationIds={props.value.locationIds || []}
        onChange={onLocationIdChange}
      />}
      <H6>String properties</H6>
      <RequirementStringPropertiesSelect
        properties={properties.stringProperties}
        onChange={onStringPropertyChange}
        value={props.value.properties?.stringProperties || {}}
      />
      <H6>Numeric properties</H6>
      <RequirementNumericPropertySelect
        properties={properties.numericProperties}
        onChange={onNumericPropertyChange}
        value={props.value.properties?.numericProperties || {}}
      />
      <H6>Objectives</H6>
      <RequirementObjectiveSelect
        objectives={properties.objectives}
        onChange={onObjectiveChange}
        value={props.value?.objectives || []}
      />
    </>
  );
};

export default RequirementEdit;
