import { Button, MenuItem } from '@blueprintjs/core';
import { IItemRendererProps, ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import LocationApi from '@shared/api/LocationApi';
import { ILocation } from '@type/location';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface ILocationInputProps {
  onChange: (locationId: string) => void;
  value?: string;
  caching?: boolean;
}

const LocationSelect = Select.ofType<ILocation>();

const filterLocation: ItemPredicate<ILocation> = (query, location: ILocation) => {
  return location.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

const renderLocationItem: ItemRenderer<ILocation> = (location: ILocation, itemProps: IItemRendererProps) => {
  if (!itemProps.modifiers.matchesPredicate) {
    return null;
  }
  return <MenuItem
    active={itemProps.modifiers.active}
    key={location.name}
    text={location.name}
    onClick={itemProps.handleClick}
  />;
};

const LocationInput = (props: ILocationInputProps) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ILocation>(null);
  const api = new LocationApi();

  useEffect(() => {
    api.find(props.caching).then((res: ILocation[]) => {
      setLocations(res);
    });
  }, []);

  useEffect(() => {
    if (props.value && locations.length) {
      setSelectedLocation(locations.find((l: ILocation) => l.id === props.value));
    }
  }, [props.value, locations]);

  const onSelect = (location: ILocation) => {
    setSelectedLocation(location);
    props.onChange(location.id);
  };

  return <LocationSelect
    activeItem={selectedLocation}
    items={locations}
    noResults={<MenuItem disabled={true} text="No results." />}
    onItemSelect={onSelect}
    itemRenderer={renderLocationItem}
    itemPredicate={filterLocation}
  >
    <Button text={selectedLocation ? selectedLocation.name : '(No selection)'} rightIcon="double-caret-vertical" />
  </LocationSelect>;
};

export default LocationInput;
