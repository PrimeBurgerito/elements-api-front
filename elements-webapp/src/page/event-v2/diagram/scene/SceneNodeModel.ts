import { DefaultLinkModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import EventNodeModel from '../EventNodeModel';

export class SceneNodeModel extends EventNodeModel {
  private static readonly OUT_PORT_NAME = 'next';
  private static readonly IN_PORT_NAME = 'previous';

  constructor(first = false) {
    super('DEFAULT', 'Scene');
    const outPort = new DefaultPortModel(false, SceneNodeModel.OUT_PORT_NAME);
    this.addPort(outPort);
    if (!first) {
      const inPort = new DefaultPortModel(true, SceneNodeModel.IN_PORT_NAME);
      this.addPort(inPort);
    }
  }

  public setNextScene = (sceneNode: SceneNodeModel): DefaultLinkModel => {
    const thisScenePort = this.getPort(SceneNodeModel.OUT_PORT_NAME);
    const nextScenePort = sceneNode.getPort(SceneNodeModel.IN_PORT_NAME);
    return thisScenePort.link(nextScenePort);
  };
}
