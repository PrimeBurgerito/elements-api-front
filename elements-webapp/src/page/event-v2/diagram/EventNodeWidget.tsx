import { Button, Card, Classes, H4, Intent, Popover } from '@blueprintjs/core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultPortLabel, DefaultPortModel } from '@projectstorm/react-diagrams-defaults';
import React from 'react';
import './event-node.scss';
import EventNodeModel from './EventNodeModel';
import { IconNames } from '@blueprintjs/icons';

type Props = {
  engine: DiagramEngine;
  node: EventNodeModel;
  color: string;
  content?: React.ReactElement;
};

const EventNodeWidget: React.FC<Props> = props => {
  const generatePort = (port: DefaultPortModel | null): React.ReactElement => {
    return port && <DefaultPortLabel engine={props.engine} port={port} key={port.getID()} />;
  };

  const popoverContent = () => {
    return (
      <Card>
        <p>Default content...</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}>
          <Button className={Classes.POPOVER_DISMISS}>
            Cancel
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="node" style={{ backgroundColor: props.color }}>
      <div className="node-title">
        <H4 className="node-title-name">
          {props.node.getOptions().label}
        </H4>
        <Popover content={props.content || popoverContent()}>
          <Button icon={IconNames.Edit} intent={Intent.DANGER} minimal />
        </Popover>
      </div>
      <div className="node-ports">
        <div className="node-port-container">
          {generatePort(props.node.inPort)}
        </div>
        <div className="node-port-container">
          {generatePort(props.node.outPort)}
        </div>
      </div>
    </div>
  );
};

export default EventNodeWidget;
