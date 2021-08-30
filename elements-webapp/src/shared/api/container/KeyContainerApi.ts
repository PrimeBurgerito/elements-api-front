import { IKeyContainer, IKeyContainerDto } from '@type/container';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';

export const keyContainerRealmApi = new RealmDocumentApi<IKeyContainerDto, IKeyContainer>('/key-container');
