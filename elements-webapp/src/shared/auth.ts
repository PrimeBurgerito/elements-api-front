import AuthApi from '@shared/api/AuthApi';
import UserApi from '@shared/api/UserApi';
import { IUser } from '@type/user';
import { useEffect, useState } from 'react';

interface IAuthenticate {
  initialLoad: boolean;
  authenticated: boolean;
  user?: IUser;
}

export type Authenticator = {
  auth: IAuthenticate,
  login: (username: string, password: string) => Promise<void>,
};

export const useProvideAuth = (): Authenticator => {
  const [auth, setAuth] = useState<IAuthenticate>({
    initialLoad: true,
    authenticated: false,
  });

  useEffect(() => {
    void authenticate();
  }, []);

  const authenticate = async (): Promise<void> => {
    const newUser = await UserApi.getCurrentUser();
    if (newUser) {
      await setAuth({
        initialLoad: false,
        authenticated: true,
        user: newUser,
      });
    } else {
      setAuth({...auth, initialLoad: false});
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
    login,
  };
};
