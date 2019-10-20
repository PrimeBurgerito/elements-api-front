import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import RewardNodeModel from '@shared/diagram/reward/RewardNodeModel';
import SceneNodeModel from '@shared/diagram/scene/SceneNodeModel';
import { SceneType } from '@type/event';

export type NodeType = SceneType;

export default class DiagramUtils {
  public static createNode = (name: string, type: NodeType, index: number): BaseNodeModel => {
    let node: BaseNodeModel;
    switch (type) {
      case 'DEFAULT':
        node = new SceneNodeModel(name, index);
        break;
      case 'REWARD':
        node = new RewardNodeModel(name, index);
        break;
      case 'OPTION':
        node = new OptionNodeModel(name, index);
    }

    if (index) {
      node.addInPort('➡️');
    }
    return node;
  };
}
