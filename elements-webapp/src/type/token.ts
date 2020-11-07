export interface IAuthenticationRequest {
  username: string;
  password: string;
}

export interface IJwt {
  email: string;
  id: string;
  roles: ReadonlyArray<string>;
  token: string;
  type: null;
  username: string;
}
