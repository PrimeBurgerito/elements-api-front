import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import LocationApi from '@shared/api/LocationApi';
import { ILocation } from '@type/Location';
import * as React from 'react';
import { useEffect, useState } from 'react';
import BaseEntityTable from '../base-entity-table/BaseEntityTable';

const locationColumns = [
  {name: 'Name', key: 'name'},
  {name: 'Nearby locations', key: 'nearbyLocations'},
];

const locationFormStructure = (selectableValues: string[]): IFormStructure => ({
  formElements: {
    name: {label: 'Name', type: FormElementType.TEXT},
    nearbyLocations: {label: 'Nearby locations', type: FormElementType.MULTI_SELECT, selectableValues},
  },
});

const LocationTable: React.FC = () => {
  const locationApi = new LocationApi();
  const [formStructure, setFormStructure] = useState<IFormStructure>(null);

  useEffect(() => {
    locationApi.find().then((res: ILocation[]) => {
      setFormStructure(locationFormStructure(mapLocationNames(res)));
    });
  }, []);

  const mapLocationNames = (res: ILocation[]): string[] => {
    return res.map((loc) => loc.name);
  };

  const onTableChange = (locations: ILocation[]) => {
    setFormStructure(locationFormStructure(mapLocationNames(locations)));
  };

  return formStructure && <BaseEntityTable
    title="Location"
    imageAdder="conditional"
    api={locationApi}
    columns={locationColumns}
    formStructure={formStructure}
    refreshOnEntityChange
    onTableChange={onTableChange}
  />;
};

export default LocationTable;
