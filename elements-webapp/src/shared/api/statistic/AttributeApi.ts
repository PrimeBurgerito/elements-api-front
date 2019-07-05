import BaseApi from '@shared/api/BaseApi';
import { IAttribute } from '@type/statistics';

export default class AttributeApi extends BaseApi<IAttribute> {
  protected PATH: string = '/attribute';
}
