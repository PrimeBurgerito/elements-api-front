import React from 'react';
import { BaseWidget, BaseWidgetProps, DefaultNodeState, DefaultPortLabel, DefaultPortModel, DiagramEngine } from 'storm-react-diagrams';
import OptionNodeModel from './OptionNodeModel';

export interface IOptionNodeProps extends BaseWidgetProps {
  node: OptionNodeModel;
  diagramEngine: DiagramEngine;
}


export default class OptionNodeWidget extends BaseWidget<IOptionNodeProps, DefaultNodeState> {

  constructor(props: IOptionNodeProps) {
    super('srd-default-node', props);
    this.state = {};
  }

  public generatePort(port: DefaultPortModel): React.ReactElement {
    return <DefaultPortLabel model={port} key={port.id} />;
  }

  public render() {
    return (
      <div {...this.getProps()} style={{background: this.props.node.color}}>
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
