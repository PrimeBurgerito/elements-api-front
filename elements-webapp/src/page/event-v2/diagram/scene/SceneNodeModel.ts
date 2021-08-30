import EventNodeModel from '../EventNodeModel';
import { IScene, SceneType } from '@type/Event';
import { DefaultPortModel } from '@projectstorm/react-diagrams';
import EventImageNodeModel from '../EventImageNodeModel';

export class SceneNodeModel extends EventImageNodeModel {
  private _text = '';

  constructor(first = false, scene?: IScene) {
    super(SceneType.DEFAULT, 'Scene', first);
    if (scene) {
      this._text = scene.text;
    }
  }

  protected addOutPort(): void {
    const outPort = new DefaultPortModel({ in: false, name: EventNodeModel.OUT_PORT_NAME, maximumLinks: 1 });
    this.addPort(outPort);
  }

  public setSceneText = (text: string): void => {
    this._text = text;
  }

  public get text(): string {
    return this._text;
  }

  public getDto(): IScene {
    const targetPort = (Object.values(this.outPort.links))[0]?.getTargetPort();
    return {
      text: this._text,
      next: targetPort && (targetPort.getNode() as EventNodeModel).getIndex(),
      type: SceneType.DEFAULT,
    };
  }
}
