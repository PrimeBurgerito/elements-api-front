import { Button, ButtonGroup, Card, EditableText, H5 } from '@blueprintjs/core';
import { Intent } from '@blueprintjs/core/lib/esnext';
import { IconNames } from '@blueprintjs/icons';
import { locationRealmApi } from '@shared/api/LocationApi';
import { useToggle } from '@shared/hooks/toggleHook';
import { ILocation, ILocationCreate } from '@type/Location';
import React, { useState } from 'react';
import NearbyLocationSelect from './NearbyLocationSelect';

type Props = {
  allLocations: ReadonlyArray<ILocation>,
  onChange: () => void,
};

const LocationCreateCard: React.FC<Props> = props => {
  const [dirty, toggleDirty] = useToggle(false);
  const [location, setLocation] = useState<ILocationCreate>({ nearbyLocations: [] });

  const onCreate = async (): Promise<void> => {
    await locationRealmApi.post(location);
    toggleDirty();
    setLocation({ nearbyLocations: [] });
    props.onChange();
  };

  const onNearbyLocationsChange = (names: string[]) => {
    if (!dirty) {
      toggleDirty();
    }
    setLocation({ ...location, nearbyLocations: names });
  };

  const onNameChange = (name: string) => {
    if (!dirty) {
      toggleDirty();
    }
    setLocation({ ...location, name });
  };

  return (
    <Card className="c-item">
      <div className="location-card-container">
        <div className="c-item">
          <H5>
            <EditableText onChange={onNameChange} />
            <ButtonGroup style={{ float: 'right' }}>
              <Button intent={Intent.WARNING} onClick={() => console.log(location)} text="Test" />
            </ButtonGroup>
          </H5>
        </div>
        <NearbyLocationSelect
          locations={props.allLocations.filter(l => l.name !== location.name)}
          selected={location.nearbyLocations}
          onChange={onNearbyLocationsChange}
        />
        <Button disabled={!dirty} intent={Intent.SUCCESS} icon={IconNames.Plus} onClick={onCreate} />
      </div>
    </Card>
  );
};

export default LocationCreateCard;
