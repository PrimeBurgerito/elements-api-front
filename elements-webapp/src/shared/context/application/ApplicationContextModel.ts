import { IUser } from '@type/user';
import { RealmHook } from '@component/Header/component/RealmHook';

export type AuthenticateContext = {
  initialLoad: boolean,
  authenticated: boolean,
  user?: IUser,
}

export interface IApplicationContext {
  auth: AuthenticateContext;
  realm: RealmHook;
  login: (username: string, password: string) => Promise<void>;
}
