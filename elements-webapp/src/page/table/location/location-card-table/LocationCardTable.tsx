import { Spinner } from '@blueprintjs/core';
import locationApi from '@shared/api/LocationApi';
import { ILocation } from '@type/Location';
import * as React from 'react';
import { useEffect, useState } from 'react';
import LocationCard from './component/LocationCard';
import LocationCreateCard from './component/LocationCreateCard';
import './location-card-table.scss';

const LocationCardTable: React.FC = () => {
  const [locations, setLocations] = useState<ReadonlyArray<ILocation>>();

  useEffect(() => {
    void getLocations();
  }, []);

  const getLocations = async (): Promise<void> => {
    const location = await locationApi.find();
    setLocations(location);
  };

  const renderCard = (location: ILocation): React.ReactElement => {
    return <LocationCard
      key={`loc-card-${location.id}`}
      location={location}
      allLocations={locations}
      onChange={getLocations}
    />;
  };

  return (
    <div className="container">
      {locations && <LocationCreateCard allLocations={locations} onChange={getLocations} />}
      {locations ? locations.map(renderCard) : <Spinner />}
    </div>
  );
};

export default LocationCardTable;
