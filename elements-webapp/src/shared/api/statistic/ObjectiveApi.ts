import BaseApi from '@shared/api/BaseApi';
import { IObjective } from '@type/statistics';

class ObjectiveApi extends BaseApi<IObjective> {
  protected PATH: string = '/objective';
}

const objectiveApi = new ObjectiveApi();
export default objectiveApi;
