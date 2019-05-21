export interface IAuthTokenRequestBody extends ITokenRequestBody {
  grant_type: string;
  username: string;
  password: string;
}

export interface IRefreshTokenRequestBody extends ITokenRequestBody {
  grant_type: string;
  refresh_token: string;
}

export interface ITokenRequestBody {
  grant_type: string;
}


export interface IToken {
  access_token: string | null;
  expires_in: number | null;
  token_type: 'Bearer' | null;
  scope: 'read' | 'write' | 'groups';
  refresh_token: string | null;
}
