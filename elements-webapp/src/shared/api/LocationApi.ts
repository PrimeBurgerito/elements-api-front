import BaseApi from '@shared/api/BaseApi';
import { ILocation } from '@type/location';

export default class LocationApi extends BaseApi<ILocation> {
  protected PATH: string = '/location';
}
