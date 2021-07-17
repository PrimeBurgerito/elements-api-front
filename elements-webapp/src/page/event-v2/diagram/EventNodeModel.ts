import { BasePositionModelOptions } from '@projectstorm/react-canvas-core';
import { DefaultPortModel } from '@projectstorm/react-diagrams';
import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams-core';
import { SceneType } from '@type/Event';

interface Props extends NodeModelGenerics {
  OPTIONS: BasePositionModelOptions & {
    label: string;
  };
}

export default class EventNodeModel extends NodeModel<Props> {
  protected ports: { [s: string]: DefaultPortModel };

  constructor(type: SceneType, label: string) {
    super({type, label});
  }

  public getPorts = (): Record<string, DefaultPortModel> => {
    return this.ports;
  };

  public getPort = (name: string): DefaultPortModel | null => {
    return this.ports[name];
  };

  public get outPorts(): DefaultPortModel[] {
    return Object.values(this.getPorts()).filter(port => !port.getOptions().in);
  }

  public get inPorts(): DefaultPortModel[] {
    return Object.values(this.getPorts()).filter(port => port.getOptions().in);
  }
}
