import { ISceneDto, SceneType } from '@type/event';
import { DefaultPortModel, DiagramEngine, NodeModel, Toolkit } from 'storm-react-diagrams';

export default class BaseNodeModel extends NodeModel {
  public ports: { [s: string]: DefaultPortModel };
  public name: string;
  public color: string;
  public scene: ISceneDto;
  public type: SceneType;
  public image: File;
  public index: number;

  constructor(type: SceneType, index: number) {
    super(type);
    this.index = index;
    this.scene = {
      text: '',
    };
  }

  public addInPort(label: string): DefaultPortModel {
    return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
  }

  public addOutPort(label: string, name?: string): DefaultPortModel {
    return this.addPort(new DefaultPortModel(false, name || Toolkit.UID(), label));
  }

  public deSerialize(object, engine: DiagramEngine) {
    super.deSerialize(object, engine);
    this.name = object.name;
    this.color = object.color;
  }

  public getInPorts(): DefaultPortModel[] {
    return Object.values(this.ports).filter((port) => port.in);
  }

  public getOutPorts(): DefaultPortModel[] {
    return Object.values(this.ports).filter((port) => !port.in);
  }
}
