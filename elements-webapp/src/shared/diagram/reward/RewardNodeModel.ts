import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import { ISceneReward, SceneType } from '@type/Event';

export default class RewardNodeModel extends BaseNodeModel {
  public scene: ISceneReward;

  constructor(name = 'Reward', index = 0) {
    super(SceneType.REWARD, index);
    this.name = name;
    this.color = 'rgb(192,100,0)';
  }
}
