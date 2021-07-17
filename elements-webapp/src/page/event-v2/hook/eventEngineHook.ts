import { BaseEntityEvent, BaseModelListener } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NodeType } from '@shared/diagram/DiagramUtils';
import { DragEventHandler, useState } from 'react';
import EventNodeModel from '../diagram/EventNodeModel';
import DiagramEngineUtil from '../util/DiagramEngineUtil';

export const useEventHook = () => {
  const [engine] = useState<DiagramEngine>(DiagramEngineUtil.createEngine());
  const [selectedNode, setSelectedNode] = useState<EventNodeModel>();

  const nodeListener: BaseModelListener = {
    selectionChanged(selectEvent: BaseEntityEvent<EventNodeModel> & { isSelected: boolean }) {
      if (selectEvent.isSelected) {
        setSelectedNode(selectEvent.entity);
      }
    }
  };

  const handleNodeDrop: DragEventHandler = event => {
    const data: { type: NodeType } = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
    // const nodesCount = Object.keys(engine.getModel().getNodes()).length;
    const node = DiagramEngineUtil.createNode(data.type);
    const points = engine.getRelativeMousePoint(event);
    node.setPosition(points.x, points.y);
    node.registerListener(nodeListener);
    engine.getModel().addNode(node);
    engine.repaintCanvas();
  };

  return {
    engine,
    selectedNode,
    handleNodeDrop,
  };
};
