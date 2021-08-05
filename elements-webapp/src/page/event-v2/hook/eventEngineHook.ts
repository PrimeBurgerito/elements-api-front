import { BaseEntityEvent, BaseModelListener } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { NodeType } from '@shared/diagram/DiagramUtils';
import { DragEventHandler, useState } from 'react';
import EventNodeModel from '../diagram/EventNodeModel';
import DiagramEngineUtil from '../util/DiagramEngineUtil';
import { Point } from '@projectstorm/geometry';

type EventHook = {
  engine: DiagramEngine,
  selectedNode: EventNodeModel,
  handleNodeDrop: DragEventHandler,
}

export const useEventHook = (): EventHook => {
  const [engine] = useState<DiagramEngine>(DiagramEngineUtil.createEngine());
  const [selectedNode, setSelectedNode] = useState<EventNodeModel>();

  const nodeListener: BaseModelListener = {
    selectionChanged(selectEvent: BaseEntityEvent<EventNodeModel> & { isSelected: boolean }) {
      if (selectEvent.isSelected) {
        setSelectedNode(selectEvent.entity);
        console.log(selectEvent.entity);
      } else {
        setSelectedNode(null);
      }
    },
    entityRemoved: (e: BaseEntityEvent<EventNodeModel>) => DiagramEngineUtil.entityRemoved(e, engine.getModel())
  };

  const handleNodeDrop: DragEventHandler = event => {
    const data: { type: NodeType } = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
    const isFirst = !engine.getModel().getNodes().length;
    const point = engine.getRelativeMousePoint(event);
    const node = createNode(data.type, point, isFirst);
    engine.getModel().addNode(node);
    engine.repaintCanvas();
  };

  const createNode = (type: NodeType, point?: Point, isFirst?: boolean): EventNodeModel => {
    const node = DiagramEngineUtil.createNode(type, isFirst);
    if (point) {
      node.setPosition(point.x, point.y);
    }
    node.registerListener(nodeListener);
    node.outPort.registerListener({})
    return node;
  }

  return {
    engine,
    selectedNode,
    handleNodeDrop,
  };
};
