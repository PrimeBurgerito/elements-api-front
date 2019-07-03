import { NodeType } from '@shared/diagram/DiagramUtils';
import * as React from 'react';
import './body-widget.scss';

export interface ITrayItemWidgetProps {
  model: { type: NodeType };
  color?: string;
  name: string;
}

const TrayItemWidget = (props: ITrayItemWidgetProps) => {
  return (
    <div
      style={{ borderColor: props.color }}
      draggable={true}
      onDragStart={(event) => event.dataTransfer.setData('storm-diagram-node', JSON.stringify(props.model))}
      className="tray-item"
    >
      {props.name}
    </div>
  );
};

export default TrayItemWidget;
