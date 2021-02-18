import BaseApi from '@shared/api/BaseApi';
import { IStringProperty } from '@type/statistics';

class StringPropertyApi extends BaseApi<IStringProperty> {
  protected PATH: string = '/property';
}

const stringPropertyApi = new StringPropertyApi();
export default stringPropertyApi;
