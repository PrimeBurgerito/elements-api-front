import SceneNodeModel from '@shared/diagram/scene/SceneNodeModel';
import * as React from 'react';
import { BaseWidget, BaseWidgetProps, DefaultNodeState, DefaultPortLabel, DiagramEngine } from 'storm-react-diagrams';

export interface ISceneNodeProps extends BaseWidgetProps {
  node: SceneNodeModel;
  diagramEngine: DiagramEngine;
}

export default class SceneNodeWidget extends BaseWidget<ISceneNodeProps, DefaultNodeState> {
  constructor(props: ISceneNodeProps) {
    super('srd-default-node', props);
    this.state = {};
  }

  public generatePort(port) {
    return <DefaultPortLabel model={port} key={port.id} />;
  }

  public render() {
    return (
      <div {...this.getProps()} style={{ background: this.props.node.color }}>
        <div className={this.bem('__title')}>
          <div className={this.bem('__name')}>{this.props.node.name}</div>
        </div>
        <div className={this.bem('__ports')}>
          <div className={this.bem('__in')}>
            {this.props.node.getInPorts().map(this.generatePort.bind(this))}
          </div>
          <div className={this.bem('__out')}>
            {this.props.node.getOutPorts().map(this.generatePort.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}
