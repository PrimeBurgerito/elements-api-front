import BaseApi from '@shared/api/BaseApi';
import { INumericProperty } from '@type/statistics';

export default class NumericPropertyApi extends BaseApi<INumericProperty> {
  protected PATH: string = '/attribute';
}
