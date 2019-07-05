import BaseApi from '@shared/api/BaseApi';
import { IObjective } from '@type/statistics';

export default class ObjectiveApi extends BaseApi<IObjective> {
  protected PATH: string = '/objective';
}
