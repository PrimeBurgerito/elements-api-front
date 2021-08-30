import BaseApi from '@shared/api/BaseApi';
import { ILocation, ILocationCreate } from '@type/Location';
import RealmDocumentApi from '@shared/api/RealmDocumentApi';

class LocationApi extends BaseApi<ILocation, ILocationCreate> {
  protected PATH: string = '/location';
}

const locationApi: BaseApi<ILocation, ILocationCreate> = new LocationApi();
export default locationApi;

export const locationRealmApi = new RealmDocumentApi<ILocationCreate, ILocation>('/location');
