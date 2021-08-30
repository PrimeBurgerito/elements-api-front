import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import StringPropertySelect from '@component/FormComponent/StringPropertySelect/StringPropertySelect';
import { useMultiToggleHook } from '@shared/hooks/multiToggleHook';
import { IRequirementStringProperties } from '@type/Requirement';
import { IStringProperty } from '@type/statistics';
import React from 'react';

type Props = {
  properties: ReadonlyArray<IStringProperty>,
  value: IRequirementStringProperties,
  onChange: (newValue: IRequirementStringProperties) => void,
};

const PropertySelect = MultiSelect.ofType<IStringProperty>();
const RequirementStringPropertiesSelect: React.FC<Props> = props => {
  const getPropertiesWithCorrectValues = (): IStringProperty[] => {
    return Object.entries(props.value).map(([key, value]) => {
      const property = props.properties.find(p => p.key === key);
      return { ...property, value: [...value] };
    });
  };

  const { selected, toggle, replace } = useMultiToggleHook<IStringProperty>(getPropertiesWithCorrectValues(), 'key');

  const onToggle = (property: IStringProperty) => {
    onChange(toggle(property));
  };

  const onReplace = (property: IStringProperty) => {
    onChange(replace(property));
  };

  const onChange = (properties: IStringProperty[]) => {
    const reqProp = properties.reduce<IRequirementStringProperties>((curr, next) => ({
      ...curr,
      [next.key]: next.value,
    }), {});
    props.onChange(reqProp);
  };

  const valueRenderer: ItemRenderer<IStringProperty> = (property, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={selected.includes(property) ? 'tick' : 'blank'}
        key={`string-prop-menu-item-${property.id}`}
        text={property.name}
        onClick={handleClick}
      />
    );
  };

  const renderStringPropertySelect = (property: IStringProperty): React.ReactElement => {
    return (
      <FormGroup key={property.id} inline label={property.name} labelInfo={`(${property.type})`}>
        <StringPropertySelect
          property={property}
          selected={property.value || []}
          onChange={onReplace}
        />
      </FormGroup>
    );
  };

  return (
    <>
      <PropertySelect
        fill
        onRemove={onToggle}
        placeholder="Select required string properties"
        items={[...new Set(props.properties)]}
        tagRenderer={p => p.name}
        itemRenderer={valueRenderer}
        onItemSelect={onToggle}
        selectedItems={selected}
        noResults={<MenuItem disabled={true} text="No results." />}
      />
      <br />
      {selected.map(renderStringPropertySelect)}
    </>
  );
};

export default RequirementStringPropertiesSelect;
