import { IObjective } from '@type/statistics';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';
import { IRealmDocument } from '@type/Realm';

const objectiveApi = new RealmDocumentApi<IObjective, IObjective & IRealmDocument>('/objective');
export default objectiveApi;
