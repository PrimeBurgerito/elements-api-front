import BaseApi from '@shared/api/BaseApi';
import { INumericProperty } from '@type/statistics';

class NumericPropertyApi extends BaseApi<INumericProperty> {
  protected PATH: string = '/attribute';
}

const numericPropertyApi = new NumericPropertyApi();
export default numericPropertyApi;
