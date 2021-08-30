import { IImageContainer, IImageContainerDto } from '@type/container';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';

export const keyContainerRealmApi = new RealmDocumentApi<IImageContainerDto, IImageContainer>('/image-container');
