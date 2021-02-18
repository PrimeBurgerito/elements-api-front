import { PropertiesHook, usePropertiesHook } from '@shared/hooks/propertiesHook';
import * as React from 'react';
import { createContext, useContext } from 'react';

export const PropertiesContext = createContext<PropertiesHook | null>(null);

export const PropertiesContextProvider: React.FC = props => {
  const properties = usePropertiesHook();
  return (
    <PropertiesContext.Provider value={properties}>
      {properties && props.children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => useContext(PropertiesContext);
