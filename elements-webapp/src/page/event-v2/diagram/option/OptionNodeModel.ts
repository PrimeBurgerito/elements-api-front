import EventNodeModel from '../EventNodeModel';
import { ISceneOption, SceneType } from '@type/Event';
import OptionPortModel from './OptionPortModel';
import { DefaultPortModel } from '@projectstorm/react-diagrams';
import OptionLinkModel from './OptionLinkModel';
import EventImageNodeModel from '../EventImageNodeModel';

export class OptionNodeModel extends EventImageNodeModel<DefaultPortModel, OptionPortModel> {
  private _text = '';

  constructor(first = false, scene?: ISceneOption) {
    super(SceneType.OPTION, 'Option', first);
    if (scene) {
      this._text = scene.text;
    }
  }

  protected addOutPort(): void {
    const outPort = new OptionPortModel();
    this.addPort(outPort);
  }

  public setSceneText = (text: string): void => {
    this._text = text;
  }

  public get text(): string {
    return this._text;
  }

  public get sceneOptions(): OptionLinkModel[] {
    return Object.values(this.outPort.links) as OptionLinkModel[];
  }

  getDto(): ISceneOption {
    return {
      text: this._text,
      type: SceneType.OPTION,
      options: this.sceneOptions.map((model: OptionLinkModel) => ({
        ...model.sceneOption,
        next: (model.getTargetPort().getNode() as EventNodeModel).getIndex(),
      })),
    };
  }
}
