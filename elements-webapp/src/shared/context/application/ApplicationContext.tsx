import { Spinner } from '@blueprintjs/core';
import { AuthenticateContext, IApplicationContext } from '@shared/context/application/ApplicationContextModel';
import React, { createContext, useContext, useEffect, useState } from 'react';
import UserApi from '@shared/api/UserApi';
import AuthApi from '@shared/api/AuthApi';
import useRealms from '@component/Header/component/RealmHook';


const ApplicationContext = createContext<IApplicationContext>(null);

const createApplicationContext = (): IApplicationContext => {
  const [auth, setAuth] = useState<AuthenticateContext>(() => ({
    initialLoad: true,
    authenticated: false,
  }));
  const realm = useRealms();

  useEffect(() => {
    void authenticate();
  }, []);

  const authenticate = async (): Promise<void> => {
    const newUser = await UserApi.getCurrentUser();
    if (newUser) {
      setAuth({
        initialLoad: false,
        authenticated: true,
        user: newUser,
      });
    } else {
      setAuth({ ...auth, initialLoad: false });
    }
  };

  const login = async (username: string, password: string): Promise<void> => {
    const jwt = await AuthApi.authenticate(username, password);
    if (jwt) {
      await authenticate();
    }
  };

  return {
    auth,
    realm,
    login,
  };
};

export const ApplicationContextProvider: React.FC = props => {
  const userContext = createApplicationContext();
  return (
    <ApplicationContext.Provider value={userContext}>
      {userContext.auth.initialLoad ? <Spinner /> : props.children}
    </ApplicationContext.Provider>
  );
};

export const useAppContext = (): IApplicationContext => useContext(ApplicationContext);
