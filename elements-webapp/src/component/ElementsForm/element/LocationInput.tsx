import { MenuItem } from '@blueprintjs/core';
import { IItemRendererProps, ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select';
import LocationApi from '@shared/api/LocationApi';
import { ILocation } from '@type/location';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface ILocationInputProps {
  onChange: (locationIds: string[]) => void;
  value?: string[];
  caching?: boolean;
}

const LocationSelect = MultiSelect.ofType<ILocation>();

const filterLocation: ItemPredicate<ILocation> = (query, location: ILocation) => {
  return location.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

const LocationInput = (props: ILocationInputProps) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<ILocation[]>([]);
  const api = new LocationApi();

  useEffect(() => {
    api.find(props.caching).then((res: ILocation[]) => {
      setLocations(res);
    });
  }, []);

  useEffect(() => {
    if (props.value && locations.length) {
      setSelectedLocations(locations.filter((l: ILocation) => props.value.includes(l.id)));
    }
  }, [props.value, locations]);

  const onSelect = (location: ILocation) => {
    const newLocations = selectedLocations
      .includes(location) ? selectedLocations.filter((l) => l !== location) : [...selectedLocations, location];
    setSelectedLocations(newLocations);
    props.onChange(newLocations.map((l) => l.id));
  };

  const renderLocationItem: ItemRenderer<ILocation> = (location: ILocation, itemProps: IItemRendererProps) => {
    if (!itemProps.modifiers.matchesPredicate) {
      return null;
    }
    return <MenuItem
      active={itemProps.modifiers.active}
      icon={selectedLocations.includes(location) ? 'tick' : 'blank'}
      key={location.name}
      text={location.name}
      onClick={itemProps.handleClick}
    />;
  };

  return <LocationSelect
    tagRenderer={(location) => location.name}
    items={locations}
    onItemSelect={onSelect}
    selectedItems={selectedLocations}
    itemRenderer={renderLocationItem}
    itemPredicate={filterLocation}
    noResults={<MenuItem disabled={true} text="No results." />}
  />;
};

export default LocationInput;
