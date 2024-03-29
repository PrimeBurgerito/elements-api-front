import { useState } from 'react';

export type RecordSelectHook<T> = {
  record: Record<string, T>,
  selected?: T,
  set: (key: string, value: T, select?: boolean) => void,
  remove: (key: keyof RecordSelectHook<T>['record'], reSelect?: boolean) => void,
  select: (key: keyof RecordSelectHook<T>['record']) => T,
}

const getFirst = <T>(initialValues?: Record<string, T>): T => {
  const values = initialValues && Object.values(initialValues)
  if (values?.length) {
    return values[0];
  }
  return null;
}

export const useRecordSelectHook = <T>(initialValues?: Record<string, T>): RecordSelectHook<T> => {
  const [record, setRecord] = useState<Record<string, T>>(initialValues || {})
  const [selected, setSelected] = useState<T>(getFirst(initialValues));

  const set = (key: string, value: T, select = false) => {
    setRecord({ ...record, [key]: value })
    if (select) {
      setSelected(value);
    }
  }

  const remove = (key: keyof typeof record, reSelect = false) => {
    if (reSelect) {
      const keys = Object.keys(record);
      const previousIndex = keys.indexOf(key) - 1;
      if (previousIndex >= 0) {
        setSelected(record[keys[previousIndex]])
      }
    }
    const newRecord = { ...record };
    delete newRecord[key];
    setRecord(newRecord);
  }

  const select = (key: keyof typeof record): T => {
    const selectedRecord = record[key];
    setSelected(selectedRecord);
    return selectedRecord;
  }

  return {
    record,
    selected,
    set,
    remove,
    select,
  }
}
