import { Button } from '@blueprintjs/core';
import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import DiagramUtils from '@shared/diagram/DiagramUtils';
import OptionNodeFactory from '@shared/diagram/option/OptionNodeFactory';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import SceneNodeFactory from '@shared/diagram/scene/SceneNodeFactory';
import { IEvent } from '@type/event';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DiagramEngine, DiagramModel, DiagramWidget } from 'storm-react-diagrams';
import { LinkModel } from 'storm-react-diagrams/src/models/LinkModel';
import './body-widget.scss';
import OptionNodeMenu from './OptionNodeMenu';
import SceneNodeMenu from './SceneNodeMenu';
import TrayItemWidget from './TrayItemWidget';
import TrayWidget from './TrayWidget';

const useForceUpdate = () => {
  const [value, set] = useState(true);
  return () => set(!value);
};

const BodyWidget = (): JSX.Element => {
  const forceUpdate = useForceUpdate();
  const [engine] = useState(new DiagramEngine());
  const [model] = useState(new DiagramModel());
  const [selectedNode, setSelectedNode] = useState<BaseNodeModel>(null);

  useEffect(() => {
    engine.installDefaultFactories();
    engine.registerNodeFactory(new SceneNodeFactory());
    engine.registerNodeFactory(new OptionNodeFactory());
    engine.setDiagramModel(model);
  }, []);

  const handleNodeDrop = (event) => {
    const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
    const nodesCount = Object.keys(model.getNodes()).length;
    const node = DiagramUtils.createNode('Scene ' + (nodesCount + 1), data.type, !nodesCount);
    const points = engine.getRelativeMousePoint(event);
    node.x = points.x;
    node.y = points.y;
    node.addListener({
      selectionChanged: ({ entity }) => setSelectedNode(entity as BaseNodeModel),
    });
    model.addNode(node);
    forceUpdate();
  };

  const handleTest = () => {
    console.log(model.getNodes());
    console.log(model.getLinks());
    console.log(collectEvent());
  };

  const collectEvent = (): IEvent => {
    const nodes = model.getNodes() as { [s: string]: BaseNodeModel };
    const keys = Object.keys(nodes);

    const assignNextScene = (link: LinkModel) => {
      const current = nodes[link.getSourcePort().parent.id];
      const nextSceneIdx = keys.indexOf(nodes[link.getTargetPort().parent.id].id);
      switch (current.scene.type) {
        case 'DEFAULT':
          current.scene.next = nextSceneIdx;
          break;
        case 'OPTION':
          const idx = parseInt(link.getSourcePort().getName(), 10);
          current.scene.options[idx].next = nextSceneIdx;
          break;
      }
    };

    Object.values(model.getLinks())
      .filter((link: LinkModel) => link.getSourcePort() && link.getTargetPort())
      .forEach(assignNextScene);

    const scenes = Object.values(nodes).map((node) => node.scene);
    return { scenes, requirement: null };
  };

  const renderSelectedNode = (): JSX.Element => {
    return selectedNode && (
      <>
        {selectedNode.type === 'OPTION' && selectedNode.constructor.name === 'OptionNodeModel' &&
        <OptionNodeMenu node={selectedNode as OptionNodeModel} update={forceUpdate} />}
        {selectedNode.type === 'DEFAULT' && <SceneNodeMenu node={selectedNode} />}
      </>
    );
  };

  return (
    <>
      <div className="diagram-body">
        <div className="header">
          <div className="title">Storm React Diagrams - Demo 5</div>
          <Button onClick={handleTest}>Test</Button>
        </div>
        <div className="content">
          <TrayWidget>
            <TrayItemWidget model={{ type: 'DEFAULT' }} name="Scene" color="rgb(192,255,0)" />
            <TrayItemWidget model={{ type: 'OPTION' }} name="Option" color="rgb(0,192,255)" />
          </TrayWidget>
          <div className="diagram-layer" onDrop={handleNodeDrop} onDragOver={(event) => event.preventDefault()}>
            <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />
          </div>
        </div>
      </div>

      {renderSelectedNode()}
    </>
  );
};

export default BodyWidget;
