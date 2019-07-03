import BaseNodeModel from '@shared/diagram/BaseNodeModel';

export default class SceneNodeModel extends BaseNodeModel {
  constructor(name: string = 'Scene') {
    super('DEFAULT');
    this.name = name;
    this.color = 'rgb(192,255,0)';
    this.addOutPort('Next');
    this.scene.type = 'DEFAULT';
  }
}
