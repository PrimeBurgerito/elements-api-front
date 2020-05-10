import BaseApi from '@shared/api/BaseApi';
import { IStringProperty } from '@type/statistics';

export default class StringPropertyApi extends BaseApi<IStringProperty> {
  protected PATH: string = '/property';
}
