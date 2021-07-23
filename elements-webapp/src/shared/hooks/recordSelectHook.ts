import { useMemo, useState } from 'react';

type RecordSelectHook<T> = {
  record: Record<string, T>,
  selected?: T,
  add: (key: string, value: T) => void,
  remove: (key: keyof RecordSelectHook<T>['record']) => void,
  select: (key: keyof RecordSelectHook<T>['record']) => void,
}

const getFirstKey = <T>(initialValues?: Record<string, T>) => {
  const keys = initialValues && Object.keys(initialValues)
  if (keys?.length) {
    return keys[0];
  }
  return null;
}

export const useRecordSelectHook = <T>(initialValues?: Record<string, T>): RecordSelectHook<T> => {
  const [record, setRecord] = useState<Record<string, T>>(initialValues || {})
  const [selectedKey, setSelectedKey] = useState<string>(getFirstKey(initialValues));
  const selected = useMemo(() => selectedKey && record[selectedKey], [selectedKey])

  const add = (key: string, value: T) => {
    setRecord({ ...record, [key]: value })
  }

  const remove = (key: keyof typeof record) => {
    const newRecord = { ...record };
    delete newRecord[key];
    setRecord(newRecord);
  }

  const select = (key: keyof typeof record) => {
    setSelectedKey(key);
  }

  return {
    record,
    selected,
    add,
    remove,
    select,
  }
}
