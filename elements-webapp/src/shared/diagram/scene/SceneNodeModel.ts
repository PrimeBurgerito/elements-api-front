import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import { IScene } from '@type/Event';

export default class SceneNodeModel extends BaseNodeModel {
  public scene: IScene;

  constructor(name: string = 'Scene', index: number = 0) {
    super('DEFAULT', index);
    this.name = name;
    this.color = 'rgb(192,255,0)';
    this.addOutPort('Next');
  }
}
