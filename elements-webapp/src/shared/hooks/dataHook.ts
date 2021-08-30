import numericPropertyApi from '@shared/api/statistic/NumericPropertyApi';
import objectiveApi from '@shared/api/statistic/ObjectiveApi';
import stringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import { INumericProperty, IObjective, IStringProperty } from '@type/statistics';
import { useEffect, useState } from 'react';
import { ILocation } from '@type/Location';
import { locationRealmApi } from '@shared/api/LocationApi';

export type DataHook = {
  stringProperties: ReadonlyArray<IStringProperty>;
  numericProperties: ReadonlyArray<INumericProperty>;
  objectives: ReadonlyArray<IObjective>;
  locations: ReadonlyArray<ILocation>;
};

export type FetchOptions = {
  locations?: boolean,
}

export const useDataHook = (options: FetchOptions = {}): DataHook => {
  const [stringProperties, setStringProperties] = useState<ReadonlyArray<IStringProperty>>([]);
  const [numericProperties, setNumericProperties] = useState<ReadonlyArray<INumericProperty>>([]);
  const [objectives, setObjectives] = useState<ReadonlyArray<IObjective>>([]);
  const [locations, setLocations] = useState<ReadonlyArray<ILocation>>([]);

  useEffect(() => {
    console.log('Loading props from hook...');
    numericPropertyApi.find().then(setNumericProperties);
    stringPropertyApi.find().then(setStringProperties);
    objectiveApi.find().then(setObjectives);
    if (options.locations) {
      locationRealmApi.find().then(setLocations);
    }
  }, [options.locations]);

  return {
    stringProperties,
    numericProperties,
    objectives,
    locations,
  };
};
