import { H4 } from '@blueprintjs/core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultPortLabel, DefaultPortModel } from '@projectstorm/react-diagrams-defaults';
import React from 'react';
import './event-node.scss';
import EventNodeModel from './EventNodeModel';

type Props = {
  engine: DiagramEngine;
  node: EventNodeModel;
  color: string;
};

const EventNodeWidget: React.FC<Props> = props => {
  const generatePort = (port: DefaultPortModel | null): React.ReactElement => {
    return port && <DefaultPortLabel engine={props.engine} port={port} key={port.getID()} />;
  };

  return (
    <div className="node" style={{backgroundColor: props.color}}>
      <div className="node-title">
        <H4 className="node-title-name">
          {props.node.getOptions().label}
        </H4>
      </div>
      <div className="node-ports">
        <div className="node-port-container">
          {props.node.inPorts.map(generatePort)}
        </div>
        <div className="node-port-container">
          {props.node.outPorts.map(generatePort)}
        </div>
      </div>
    </div>
  );
};

export default EventNodeWidget;
