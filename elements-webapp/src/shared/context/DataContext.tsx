import { DataHook, FetchOptions, useDataHook } from '@shared/hooks/dataHook';
import React, { createContext, useContext } from 'react';

export const DataContext = createContext<DataHook | null>(null);

type Props = {
  fetch?: FetchOptions,
}

export const DataContextProvider: React.FC<Props> = props => {
  const properties = useDataHook(props.fetch || {});
  return (
    <DataContext.Provider value={properties}>
      {properties && props.children}
    </DataContext.Provider>
  );
};

export const useData = (): DataHook => useContext(DataContext);
