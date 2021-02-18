import { Spinner } from '@blueprintjs/core';
import { Authenticator, useProvideAuth } from '@shared/auth';
import * as React from 'react';
import { createContext, useContext } from 'react';


export const ApplicationContext = createContext<Authenticator | null>(null);

export const ApplicationContextProvider: React.FC = props => {
  const auth = useProvideAuth();
  return (
    <ApplicationContext.Provider value={auth}>
      {auth.auth.initialLoad ? <Spinner /> : props.children}
    </ApplicationContext.Provider>
  );
};

export const useAppContext = () => useContext(ApplicationContext);
