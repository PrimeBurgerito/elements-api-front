import IDocumentBase from '@type/DocumentBase';

export interface IRealmDocument extends IDocumentBase {
  realmId: string;
}

export interface IRealmDocumentDto {
  realmId?: string;
}

export interface IRealm extends IDocumentBase {
  name: string;
}

export interface IRealmDto {
  name: string;
  id: string;
}
