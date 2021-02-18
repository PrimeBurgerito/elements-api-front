import { IRequirementNumericProperties } from '@type/Requirement';
import { INumericProperty } from '@type/statistics';
import { useState } from 'react';

type Hook = {
  value: IRequirementNumericProperties;
  toggle: (item: INumericProperty) => IRequirementNumericProperties;
  setRequirement: (item: INumericProperty, min: number, max: number) => IRequirementNumericProperties;
};

export const useNumericPropertyRequirementHook = (initialValue?: IRequirementNumericProperties): Hook => {
  const [value, setValue] = useState<IRequirementNumericProperties>(initialValue || {});

  const toggle = (item: INumericProperty): IRequirementNumericProperties => {
    const newValue = {...value};
    if (Object.keys(value).includes(item.key)) {
      delete newValue[item.key];
    } else {
      newValue[item.key] = {first: item.min, second: item.max};
    }
    setValue(newValue);
    return newValue;
  };

  const setRequirement = (item: INumericProperty, min: number, max: number): IRequirementNumericProperties => {
    const newValue = {...value};
    newValue[item.key] = {first: min < item.min ? item.min : min, second: max > item.max ? item.max : max};
    setValue(newValue);
    return newValue;
  };

  return {
    value,
    toggle,
    setRequirement,
  };
};
