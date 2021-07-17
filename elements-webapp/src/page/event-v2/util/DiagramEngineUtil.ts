import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { SceneType } from '@type/Event';
import EventNodeModel from '../diagram/EventNodeModel';
import OptionNodeFactory from '../diagram/option/OptionNodeFactory';
import { OptionNodeModel } from '../diagram/option/OptionNodeModel';
import RewardNodeFactory from '../diagram/reward/RewardNodeFactory';
import { RewardNodeModel } from '../diagram/reward/RewardNodeModel';
import SceneNodeFactory from '../diagram/scene/SceneNodeFactory';
import { SceneNodeModel } from '../diagram/scene/SceneNodeModel';

export default class DiagramEngineUtil {
  public static createEngine = (): DiagramEngine => {
    const newEngine: DiagramEngine = createEngine();
    newEngine.getNodeFactories().registerFactory(new SceneNodeFactory());
    newEngine.getNodeFactories().registerFactory(new OptionNodeFactory());
    newEngine.getNodeFactories().registerFactory(new RewardNodeFactory());

    const model = new DiagramModel();
    newEngine.setModel(model);

    return newEngine;
  };

  public static createNode(type: SceneType): EventNodeModel {
    switch (type) {
      case 'OPTION':
        return new OptionNodeModel();
      case 'REWARD':
        return new RewardNodeModel();
      default:
        return new SceneNodeModel();
    }
  }
}
