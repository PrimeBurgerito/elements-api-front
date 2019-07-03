import BaseNodeModel from '@shared/diagram/BaseNodeModel';

export default class OptionNodeModel extends BaseNodeModel {
  constructor(name: string = 'Option') {
    super('OPTION');
    this.name = name;
    this.color = 'rgb(0,192,255)';
    this.scene.type = 'OPTION';
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
