import React from 'react';
import { H6, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { ILocation } from '@type/Location';
import { useMultiToggleHook } from '@shared/hooks/multiToggleHook';

type Props = {
  locations: ILocation[],
  locationIds: string[],
  onChange: (locationIds: string[]) => void,
}

const LocationSelectTyped = MultiSelect.ofType<ILocation>();

const LocationIdSelect: React.FC<Props> = props => {
  const {
    selected,
    toggle,
  } = useMultiToggleHook<ILocation>(props.locationIds.map(id => props.locations.find(l => l.id === id)));

  const valueRenderer: ItemRenderer<ILocation> = (location, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={selected.includes(location) ? 'tick' : 'blank'}
        key={`loc-menu-item-${location.id}`}
        text={location.name}
        onClick={handleClick}
      />
    );
  };

  const onChange = (location: ILocation) => {
    const newSelection = toggle(location);
    props.onChange(newSelection.map(l => l.id));
  };

  return (
    <>
      <H6>Locations</H6>
      <LocationSelectTyped
        fill
        items={props.locations}
        tagRenderer={l => l.name}
        itemRenderer={valueRenderer}
        selectedItems={selected}
        onItemSelect={onChange}
      />
      <br />
    </>
  );
}

export default LocationIdSelect;
