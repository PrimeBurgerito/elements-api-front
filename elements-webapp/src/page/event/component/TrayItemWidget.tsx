import { NodeType } from '@shared/diagram/DiagramUtils';
import React, { DragEventHandler } from 'react';
import './event-component.scss';

type Props = {
  model: { type: NodeType };
  color?: string;
  name: string;
};

const TrayItemWidget: React.FC<Props> = props => {
  const handleDragStart: DragEventHandler = event => {
    event.dataTransfer.setData('storm-diagram-node', JSON.stringify(props.model));
  };

  return (
    <div style={{ borderColor: props.color }} draggable={true} onDragStart={handleDragStart} className="tray-item">
      {props.name}
    </div>
  );
};

export default TrayItemWidget;
