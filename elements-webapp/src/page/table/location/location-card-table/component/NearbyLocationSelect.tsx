import { H6, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { useMultiToggleHook } from '@shared/hooks/multiToggleHook';
import { ILocation } from '@type/Location';
import React from 'react';


type Props = {
  locations: ReadonlyArray<ILocation>,
  selected: string[],
  onChange: (names: string[]) => void,
};

const NearbyLocationSelectTyped = MultiSelect.ofType<ILocation>();
const NearbyLocationSelect: React.FC<Props> = props => {
  const {selected, toggle} = useMultiToggleHook<ILocation>(props.selected.map(name => props.locations.find(l => l.name === name)));

  const valueRenderer: ItemRenderer<ILocation> = (location, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={selected.includes(location) ? 'tick' : 'blank'}
        key={`nearby-loc-menu-item-${location.id}`}
        text={location.name}
        onClick={handleClick}
      />
    );
  };

  const onChange = (location: ILocation) => {
    const newSelection = toggle(location);
    props.onChange(newSelection.map(l => l.name));
  };

  return (
    <div className="c-item">
      <H6>Nearby Locations</H6>
      <NearbyLocationSelectTyped
        fill
        items={[...new Set(props.locations)]}
        tagRenderer={l => l.name}
        itemRenderer={valueRenderer}
        selectedItems={selected}
        onItemSelect={onChange}
      />
    </div>
  );
};

export default NearbyLocationSelect;
