import { BasePositionModelOptions } from '@projectstorm/react-canvas-core';
import { DefaultPortModel, DiagramModel } from '@projectstorm/react-diagrams';
import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { ISceneBase, SceneType } from '@type/Event';

interface Props extends NodeModelGenerics {
  OPTIONS: BasePositionModelOptions & {
    label: string;
  };
}

export default abstract class EventNodeModel<IP extends DefaultPortModel = DefaultPortModel, OP extends DefaultPortModel = DefaultPortModel>
  extends NodeModel<Props> {
  public static readonly OUT_PORT_NAME = 'next';
  private static readonly IN_PORT_NAME = 'previous';

  protected ports: {
    [EventNodeModel.IN_PORT_NAME]: IP,
    [EventNodeModel.OUT_PORT_NAME]: OP,
  };

  protected constructor(type: SceneType, label: string, public first = false) {
    super({ type, label });
    this.addOutPort();
    if (!first) {
      this.addInPort();
    }
  }

  private addInPort = (): void => {
    const inPort = new DefaultPortModel(true, EventNodeModel.IN_PORT_NAME);
    this.addPort(inPort);
  }

  protected abstract addOutPort(): void;

  public abstract getDto(): ISceneBase;

  public getPorts = (): Record<string, DefaultPortModel> => {
    return this.ports;
  };

  public getPort = (name: string): DefaultPortModel | null => {
    return this.ports[name];
  };

  public get outPort(): OP {
    return this.ports[EventNodeModel.OUT_PORT_NAME];
  }

  public get inPort(): IP {
    return this.ports[EventNodeModel.IN_PORT_NAME];
  }

  public getIndex(): number {
    const nodes = (this.getParentCanvasModel() as DiagramModel).getNodes();
    return nodes.indexOf(this);
  }

  protected getNodes = (): EventNodeModel[] => {
    return Object.values(this.parent.getNodes()) as EventNodeModel[];
  }
}
