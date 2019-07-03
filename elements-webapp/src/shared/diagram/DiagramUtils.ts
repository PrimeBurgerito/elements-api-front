import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import SceneNodeModel from '@shared/diagram/scene/SceneNodeModel';
import { SceneType } from '@type/event'

export type NodeType = SceneType;

export default class DiagramUtils {
  public static createNode = (name: string, type: NodeType, first: boolean): BaseNodeModel => {
    let node: BaseNodeModel;
    switch (type) {
      case 'DEFAULT':
        node = new SceneNodeModel(name);
        break;
      case 'OPTION':
        node = new OptionNodeModel(name);
    }

    if (!first) {
      node.addInPort('➡️');
    }
    return node;
  }
}
