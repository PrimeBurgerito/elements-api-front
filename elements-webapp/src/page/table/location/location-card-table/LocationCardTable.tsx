import { locationRealmApi } from '@shared/api/LocationApi';
import { ILocation } from '@type/Location';
import React, { useEffect, useState } from 'react';
import LocationCard from './component/LocationCard';
import LocationCreateCard from './component/LocationCreateCard';
import './location-card-table.scss';

const LocationCardTable: React.FC = () => {
  const [locations, setLocations] = useState<ReadonlyArray<ILocation>>();

  useEffect(() => {
    void getLocations();
  }, []);

  const getLocations = async (): Promise<void> => {
    const allLocations = await locationRealmApi.find();
    setLocations(allLocations);
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
    <div className="location-container">
      {locations && <LocationCreateCard allLocations={locations} onChange={getLocations} />}
      {locations ? locations.map(renderCard) : <div>Loading...</div>}
    </div>
  );
};

export default LocationCardTable;
