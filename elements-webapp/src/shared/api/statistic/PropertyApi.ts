import BaseApi from '@shared/api/BaseApi';
import { IProperty } from '@type/statistics';

export default class PropertyApi extends BaseApi<IProperty> {
  protected PATH: string = '/property';
}
