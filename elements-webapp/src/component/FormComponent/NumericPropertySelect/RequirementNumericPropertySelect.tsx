import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import RequirementNumericPropertyValueInput from '@component/FormComponent/NumericPropertySelect/RequirementNumericPropertyValueInput';
import { useNumericPropertyRequirementHook } from '@shared/hooks/requirementHooks';
import { IRequirementNumericProperties } from '@type/Requirement';
import { INumericProperty } from '@type/statistics';
import * as React from 'react';
import { useMemo } from 'react';

type Props = {
  properties: INumericProperty[],
  value: IRequirementNumericProperties,
  onChange: (newValue: IRequirementNumericProperties) => void,
};

const PropertySelect = MultiSelect.ofType<INumericProperty>();
const RequirementNumericPropertySelect: React.FC<Props> = props => {
  const {value, toggle, setRequirement} = useNumericPropertyRequirementHook(props.value);
  const selectedProperties = useMemo<INumericProperty[]>(() => props.properties.filter(p => Object.keys(value).includes(p.key)),
    [value]);

  const onToggle = (property: INumericProperty) => {
    props.onChange(toggle(property));
  };

  const valueRenderer: ItemRenderer<INumericProperty> = (property, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={Object.keys(value).includes(property.key) ? 'tick' : 'blank'}
        key={`numeric-prop-menu-item-${property.id}`}
        text={property.name}
        onClick={handleClick}
      />
    );
  };

  const renderNumericPropertyInput = ([key, propValue]: [string, { first: number, second: number }]): React.ReactElement => {
    const property = props.properties.find(p => p.key === key);
    return (
      <FormGroup key={property.id} inline label={property.name}>
        <RequirementNumericPropertyValueInput
          property={property}
          value={propValue}
          onChange={setRequirement}
        />
      </FormGroup>
    );
  };

  return (
    <>
      <PropertySelect
        fill
        placeholder="Select required numeric properties"
        items={[...new Set(props.properties)]}
        tagRenderer={p => p.name}
        itemRenderer={valueRenderer}
        selectedItems={selectedProperties}
        onItemSelect={onToggle}
        onRemove={toggle}
        noResults={<MenuItem disabled={true} text="No results." />}
      />
      <br />
      {Object.entries(value).map(renderNumericPropertyInput)}
    </>
  );
};

export default RequirementNumericPropertySelect;
