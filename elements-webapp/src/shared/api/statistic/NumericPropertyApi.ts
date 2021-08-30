import { INumericProperty } from '@type/statistics';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';
import { IRealmDocument } from '@type/Realm';

const numericPropertyApi = new RealmDocumentApi<INumericProperty, INumericProperty & IRealmDocument>('/attribute');
export default numericPropertyApi;
