import { useState } from 'react';

type Hook<T> = {
  selected: T[];
  toggle: (item: T) => T[];
  setValue: (item: T) => T[];
  replace: (item: T) => T[];
};

export const useMultiToggleHook = <T>(initial?: T[], toggleKey?: keyof T): Hook<T> => {
  const [selected, setSelected] = useState<T[]>(initial || []);

  const toggle = (item: T): T[] => {
    const includes: boolean = toggleKey ? selected.some(i => i[toggleKey] === item[toggleKey]) : selected.includes(item);
    const newSelected = includes ? selected.filter(v => toggleKey ? v[toggleKey] !== item[toggleKey] : (v !== item)) : [...selected, item];
    setSelected(newSelected);
    return newSelected;
  };

  const setValue = (item: T): T[] => {
    setSelected([item]);
    return [item];
  };

  const replace = (item: T): T[] => {
    const index = toggleKey ? selected.findIndex(i => i[toggleKey] === item[toggleKey]) : selected.indexOf(item);
    if (index === -1) {
      const newSelected = [...selected, item];
      setSelected(newSelected);
      return newSelected;
    } else {
      const newSelected = [...selected];
      newSelected[index] = item;
      setSelected(newSelected);
      return newSelected;
    }
  };

  return {
    selected,
    toggle,
    setValue,
    replace,
  };
};
