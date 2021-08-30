import { IRealm } from '@type/Realm';
import { IJwt } from '@type/token';

const STORAGE_KEY_BASE = 'random_game';
const TOKEN_STORAGE_KEY = `${STORAGE_KEY_BASE}_auth_token`;
const REALM_STORAGE_KEY = `${STORAGE_KEY_BASE}_realm`;

export class SessionUtil {
  public static getRealm = (): IRealm => {
    return JSON.parse(sessionStorage.getItem(REALM_STORAGE_KEY));
  }

  public static setRealm = (realm: IRealm): void => {
    sessionStorage.setItem(REALM_STORAGE_KEY, JSON.stringify(realm));
  }

  public static setToken = (jwt: IJwt): void => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, jwt.token);
  }

  public static getToken = (): string => {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  }
}
