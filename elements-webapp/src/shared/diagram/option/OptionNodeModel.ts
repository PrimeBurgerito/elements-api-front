import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import { ISceneOption } from '@type/Event';

export default class OptionNodeModel extends BaseNodeModel {
  public scene: ISceneOption;

  constructor(name: string = 'Option', index: number = 0) {
    super('OPTION', index);
    this.name = name;
    this.color = 'rgb(0,192,255)';
    this.scene.options = [];
  }

  public addOption() {
    this.scene.options.push({
      text: '',
    });
    const idx = this.getOutPorts().length;
    this.addOutPort(`Option ${idx + 1}`, idx.toString());
  }
}
