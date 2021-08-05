import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import { IScene, SceneType } from '@type/Event';

export default class SceneNodeModel extends BaseNodeModel {
  public scene: IScene;

  constructor(name = 'Scene', index = 0) {
    super(SceneType.DEFAULT, index);
    this.name = name;
    this.color = 'rgb(192,255,0)';
    this.addOutPort('Next');
  }
}
