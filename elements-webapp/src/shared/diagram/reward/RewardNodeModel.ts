import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import { ISceneReward } from '@type/event';

export default class RewardNodeModel extends BaseNodeModel {
  public scene: ISceneReward;

  constructor(name: string = 'Reward', index: number = 0) {
    super('REWARD', index);
    this.name = name;
    this.color = 'rgb(192,100,0)';
  }
}
