import { Button, ButtonGroup, Card, H5 } from '@blueprintjs/core';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';
import locationApi from '@shared/api/LocationApi';
import { useToggle } from '@shared/hooks/toggleHook';
import { ILocation } from '@type/Location';
import React, { useState } from 'react';
import './location-card.scss';
import LocationImages from './LocationImages';
import NearbyLocationSelect from './NearbyLocationSelect';

type Props = {
  location: ILocation,
  allLocations: ReadonlyArray<ILocation>,
  onChange: () => void,
};

const LocationCard: React.FC<Props> = props => {
  const [dirty, toggleDirty] = useToggle(false);
  const [location, setLocation] = useState(props.location);

  const onUpdate = async (): Promise<void> => {
    await locationApi.put(location.id, {
      name: location.name,
      nearbyLocations: location.nearbyLocations,
    });
    props.onChange();
  };

  const onDelete = async (): Promise<void> => {
    await locationApi.delete(location.id);
    props.onChange();
  }

  const onNearbyLocationsChange = (names: string[]) => {
    if (!dirty) {
      toggleDirty();
    }
    setLocation({ ...location, nearbyLocations: names });
  };

  return (
    <Card className="c-item">
      <div className="location-card-container">
        <H5>
          {location.name}
          <ButtonGroup style={{ float: 'right' }}>
            <Button
              disabled={!dirty}
              intent={Intent.PRIMARY}
              text="Update"
              icon={IconNames.Refresh}
              onClick={onUpdate}
            />
            <Button intent={Intent.WARNING} onClick={() => console.log(location)} text="Test" />
            <Button intent={Intent.DANGER} icon={IconNames.Trash} onClick={onDelete} />
          </ButtonGroup>
        </H5>
        <NearbyLocationSelect
          locations={props.allLocations.filter(l => l.name !== location.name)}
          selected={location.nearbyLocations}
          onChange={onNearbyLocationsChange}
        />
        <LocationImages images={location.images} entityId={location.id} />
      </div>
    </Card>
  );
};

export default LocationCard;
