import { useState } from 'react';

type Hook<T> = {
  selectedItem: T,
  next: () => void,
  previous: () => void,
  setItems: (newItems?: ReadonlyArray<T>) => void,
  length: number,
  removeCurrent: () => ReadonlyArray<T>,
  add: (item: T) => void,
};

export const useArraySelectHook = <T>(initialItems?: ReadonlyArray<T>): Hook<T> => {
  const [items, setNewItems] = useState(initialItems || []);
  const [selectedItem, setSelectedItem] = useState<T>(items.length ? items[0] : null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setItems = (newItems?: ReadonlyArray<T>) => {
    setNewItems(newItems || []);
    setSelectedIndex(0);
    setSelectedItem(newItems?.length ? items[0] : null);
  };

  const next = () => {
    if (items.length) {
      const newIndex = items.length === selectedIndex + 1 ? 0 : selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedItem(items[newIndex]);
    }
  };

  const previous = () => {
    if (items.length) {
      const newIndex = selectedIndex === 0 ? (items.length - 1) : selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedItem(items[newIndex]);
    }
  };

  const removeCurrent = (): ReadonlyArray<T> => {
    const newItems = items.filter(i => i !== selectedItem);
    if (newItems.length) {
      setSelectedItem(newItems[0]);
    } else {
      setSelectedItem(null);
    }
    setSelectedIndex(0);
    setNewItems(newItems);
    return newItems;
  };

  const add = (item: T) => {
    setNewItems([...items, item]);
    setSelectedIndex(items.length);
    setSelectedItem(item);
  };

  return {
    selectedItem,
    next,
    previous,
    setItems,
    length: items.length,
    removeCurrent,
    add,
  };
};
