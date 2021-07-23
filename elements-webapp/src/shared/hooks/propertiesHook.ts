import numericPropertyApi from '@shared/api/statistic/NumericPropertyApi';
import objectiveApi from '@shared/api/statistic/ObjectiveApi';
import stringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import { INumericProperty, IObjective, IStringProperty } from '@type/statistics';
import { useEffect, useState } from 'react';

export type PropertiesHook = {
  stringProperties: IStringProperty[];
  numericProperties: INumericProperty[];
  objectives: IObjective[];
  loadProperties: () => void;
};

export const usePropertiesHook = (): PropertiesHook => {
  const [stringProperties, setStringProperties] = useState<IStringProperty[]>([]);
  const [numericProperties, setNumericProperties] = useState<INumericProperty[]>([]);
  const [objectives, setObjectives] = useState<IObjective[]>([]);

  useEffect(() => {
    console.log('Loading props from hook...');
    loadProperties();
  }, []);

  const loadProperties = () => {
    numericPropertyApi.find(false).then(setNumericProperties);
    stringPropertyApi.find(false).then(setStringProperties);
    objectiveApi.find(false).then(setObjectives);
  };

  return {
    stringProperties,
    numericProperties,
    objectives,
    loadProperties
  };
};
