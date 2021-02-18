import { useState } from 'react';

type Hook = [boolean, () => boolean];

export const useToggle = (initial = false): Hook => {
  const [value, setValue] = useState(initial);

  const toggle = (): boolean => {
    const newValue = !value;
    setValue(newValue);
    return newValue;
  };

  return [value, toggle];
};
