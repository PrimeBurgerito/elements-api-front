import BaseApi from '@shared/api/BaseApi';
import { ILocation, ILocationCreate } from '@type/Location';

class LocationApi extends BaseApi<ILocation, ILocationCreate> {
  protected PATH: string = '/location';
}

const locationApi: BaseApi<ILocation, ILocationCreate> = new LocationApi();
export default locationApi;
