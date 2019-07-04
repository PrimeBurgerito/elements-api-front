import { Button, H1 } from '@blueprintjs/core';
import EventApi from '@shared/api/EventApi';
import { APPLICATION_JSON_OPTION } from '@shared/api/request-template/AxiosInstance';
import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import DiagramUtils from '@shared/diagram/DiagramUtils';
import OptionNodeFactory from '@shared/diagram/option/OptionNodeFactory';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import SceneNodeFactory from '@shared/diagram/scene/SceneNodeFactory';
import { IEventDto, IImageToSceneMap } from '@type/event';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DiagramEngine, DiagramModel, DiagramWidget, LinkModel } from 'storm-react-diagrams';
import '../event-component.scss';
import OptionNodeMenu from '../option-node-menu/OptionNodeMenu';
import SceneNodeMenu from '../SceneNodeMenu';
import TrayItemWidget from '../TrayItemWidget';
import TrayWidget from '../TrayWidget';

const FORM_DATA_FILES = 'files';
const FORM_DATA_IMAGE_TO_SCENE = 'imageToSceneMap';
const FORM_DATA_EVENT_DTO = 'eventDto';

const useForceUpdate = () => {
  const [value, set] = useState(true);
  return () => set(!value);
};

const EventPageBody = (): JSX.Element => {
  const forceUpdate = useForceUpdate();
  const [engine] = useState(new DiagramEngine());
  const [model] = useState(new DiagramModel());
  const [selectedNode, setSelectedNode] = useState<BaseNodeModel>(null);

  useEffect(() => {
    engine.installDefaultFactories();
    engine.registerNodeFactory(new SceneNodeFactory());
    engine.registerNodeFactory(new OptionNodeFactory());
    engine.setDiagramModel(model);
    model.setZoomLevel(model.getZoomLevel() * 2);
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

  const collectEvent = (): IEventDto => {
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

  const collectFormData = (): FormData => {
    const formData = new FormData();
    const eventDto = collectEvent();
    const imageToSceneMap: IImageToSceneMap[] = [];
    Object.values(model.getNodes())
      .filter((node: BaseNodeModel) => node.image)
      .forEach((node: BaseNodeModel, imageIndex: number) => {
        formData.append(FORM_DATA_FILES, node.image);
        const sceneIndex = eventDto.scenes.indexOf(node.scene);
        imageToSceneMap.push({ imageIndex, sceneIndex });
      });

    formData.append(FORM_DATA_IMAGE_TO_SCENE, new Blob([JSON.stringify(imageToSceneMap)], APPLICATION_JSON_OPTION));
    formData.append(FORM_DATA_EVENT_DTO, new Blob([JSON.stringify(eventDto)], APPLICATION_JSON_OPTION));
    return formData;
  };

  const handleSubmit = () => {
    EventApi.post(collectFormData()).then(console.log);
  };

  const renderSelectedNode = (): JSX.Element => {
    return selectedNode && (
      <div>
        <H1>{selectedNode.name}</H1>
        <Button intent="primary" large onClick={handleSubmit}>Submit</Button>
        {selectedNode.type === 'OPTION' && selectedNode.constructor.name === 'OptionNodeModel' &&
        <OptionNodeMenu node={selectedNode as OptionNodeModel} update={forceUpdate} />}
        {selectedNode.type === 'DEFAULT' && <SceneNodeMenu node={selectedNode} />}
      </div>
    );
  };

  return (
    <>
      <div className="diagram-body">
        <div className="header">
          <div className="title">Elements Event Diagram</div>
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

export default EventPageBody;
