import { IStringProperty } from '@type/statistics';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';
import { IRealmDocument } from '@type/Realm';

const stringPropertyApi = new RealmDocumentApi<IStringProperty, IStringProperty & IRealmDocument>('/property');
export default stringPropertyApi;
