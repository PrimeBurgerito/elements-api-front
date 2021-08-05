import EventNodeModel from '../EventNodeModel';
import { ISceneReward, SceneType } from '@type/Event';
import { DefaultPortModel } from '@projectstorm/react-diagrams';

export class RewardNodeModel extends EventNodeModel {
  constructor(first = false) {
    super(SceneType.REWARD, 'Reward', first);
  }

  protected addOutPort(): void {
    const outPort = new DefaultPortModel({ in: false, name: EventNodeModel.OUT_PORT_NAME, maximumLinks: 1 });
    this.addPort(outPort);
  }

  public getDto(): ISceneReward {
    return {
      next: (this.outPort.links[0].getTargetPort().getNode() as EventNodeModel).getIndex(),
      type: SceneType.REWARD,
      reward: {
        stringProperties: [],
        numericProperties: [],
        objectives: [],
      },
    };
  }
}
