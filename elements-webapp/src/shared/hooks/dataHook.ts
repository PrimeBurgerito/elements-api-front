import numericPropertyApi from '@shared/api/statistic/NumericPropertyApi';
import objectiveApi from '@shared/api/statistic/ObjectiveApi';
import stringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import { INumericProperty, IObjective, IStringProperty } from '@type/statistics';
import { useEffect, useState } from 'react';
import { ILocation } from '@type/Location';
import locationApi from '@shared/api/LocationApi';

export type DataHook = {
  stringProperties: IStringProperty[];
  numericProperties: INumericProperty[];
  objectives: IObjective[];
  locations: ILocation[];
};

export type FetchOptions = {
  locations?: boolean,
}

export const useDataHook = (options: FetchOptions = {}): DataHook => {
  const [stringProperties, setStringProperties] = useState<IStringProperty[]>([]);
  const [numericProperties, setNumericProperties] = useState<INumericProperty[]>([]);
  const [objectives, setObjectives] = useState<IObjective[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    console.log('Loading props from hook...');
    numericPropertyApi.find(false).then(setNumericProperties);
    stringPropertyApi.find(false).then(setStringProperties);
    objectiveApi.find(false).then(setObjectives);
    if (options.locations) {
      locationApi.find(false).then(setLocations);
    }
  }, [options.locations]);

  return {
    stringProperties,
    numericProperties,
    objectives,
    locations,
  };
};
