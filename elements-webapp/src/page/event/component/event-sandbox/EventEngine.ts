import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import DiagramUtils, { NodeType } from '@shared/diagram/DiagramUtils';
import OptionNodeFactory from '@shared/diagram/option/OptionNodeFactory';
import RewardNodeFactory from '@shared/diagram/reward/RewardNodeFactory';
import SceneNodeFactory from '@shared/diagram/scene/SceneNodeFactory';
import { IEventDto, IImageToSceneMap, IScene, ISceneBase, ISceneOption, ISceneReward } from '@type/Event';
import { DragEventHandler, useState } from 'react';
import { DiagramEngine, DiagramModel, LinkModel } from 'storm-react-diagrams';
import { EventSave } from '@shared/api/EventApi';

type PartialEventDto = Pick<IEventDto, 'requirement' | 'name'>;

class EventEngine {
  private diagramEngine = new DiagramEngine();

  constructor() {
    this.diagramEngine.installDefaultFactories();
    this.diagramEngine.registerNodeFactory(new SceneNodeFactory());
    this.diagramEngine.registerNodeFactory(new OptionNodeFactory());
    this.diagramEngine.registerNodeFactory(new RewardNodeFactory());
    this.model.setZoomLevel(this.model.getZoomLevel() * 2);
  }

  public get engine(): DiagramEngine {
    return this.diagramEngine;
  }

  public get model(): DiagramModel {
    return this.diagramEngine.getDiagramModel();
  }

  private get nodes(): { [s: string]: BaseNodeModel } {
    return this.model.getNodes() as { [s: string]: BaseNodeModel };
  }

  private assignNextScene = (nodes: [string, BaseNodeModel][]) => (link: LinkModel): void => {
    const sourceNode = nodes.find(([key]) => key === link.getSourcePort().parent.id)[1];
    const nextSceneIdx = nodes.find(([key]) => key === link.getTargetPort().parent.id)[1].index;
    switch (sourceNode.type) {
      case 'DEFAULT':
        (sourceNode.scene as IScene).next = nextSceneIdx;
        break;
      case 'REWARD':
        (sourceNode.scene as ISceneReward).next = nextSceneIdx;
        break;
      case 'OPTION':
        const idx = parseInt(link.getSourcePort().getName(), 10);
        (sourceNode.scene as ISceneOption).options[idx].next = nextSceneIdx;
        break;
    }
  };

  private collectScenes = (): ISceneBase[] => {
    const nodes: [string, BaseNodeModel][] = Object.entries(this.nodes).sort(([, node]) => node.index);

    Object.values(this.model.getLinks())
      .filter((link: LinkModel) => link.getSourcePort() && link.getTargetPort())
      .forEach(this.assignNextScene(nodes));

    return nodes.map(([, node]) => node.scene);
  };

  public collectFormData = (rest: PartialEventDto): EventSave => {
    const scenes = this.collectScenes();
    const imageToSceneMap: IImageToSceneMap[] = [];
    const files = Object.values(this.model.getNodes())
      .filter((node: BaseNodeModel) => node.image)
      .map((node: BaseNodeModel, imageIndex: number) => {
        const sceneIndex = scenes.indexOf(node.scene);
        imageToSceneMap.push({ imageIndex, sceneIndex });
        return node.image;
      });

    const eventDto: IEventDto = { ...rest, scenes };
    return {
      dto: eventDto,
      imageToSceneMap,
      images: files,
    };
  };
}

type Hook = {
  eventEngine: EventEngine,
  selectedNode: BaseNodeModel,
  handleNodeDrop: DragEventHandler,
};

export const useEventEngineHook = (): Hook => {
  const [eventEngine] = useState(new EventEngine());
  const [selectedNode, setSelectedNode] = useState<BaseNodeModel>(null);

  const handleNodeDrop: DragEventHandler = event => {
    const data: { type: NodeType } = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
    const nodesCount = Object.keys(eventEngine.model.getNodes()).length;
    const node = DiagramUtils.createNode('Scene ' + (nodesCount + 1), data.type, nodesCount);
    const points = eventEngine.engine.getRelativeMousePoint(event);
    node.x = points.x;
    node.y = points.y;
    node.addListener({
      selectionChanged: ({ entity }) => setSelectedNode(entity as BaseNodeModel),
    });
    eventEngine.model.addNode(node);
  };

  return {
    eventEngine,
    selectedNode,
    handleNodeDrop,
  };
};
