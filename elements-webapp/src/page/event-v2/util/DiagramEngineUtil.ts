import createEngine, { DiagramModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams';
import { DefaultDiagramState, DiagramEngine, LinkModel } from '@projectstorm/react-diagrams-core';
import { IEvent, IScene, ISceneBase, ISceneOption, SceneType } from '@type/Event';
import EventNodeModel from '../diagram/EventNodeModel';
import OptionNodeFactory from '../diagram/option/OptionNodeFactory';
import { OptionNodeModel } from '../diagram/option/OptionNodeModel';
import RewardNodeFactory from '../diagram/reward/RewardNodeFactory';
import { RewardNodeModel } from '../diagram/reward/RewardNodeModel';
import SceneNodeFactory from '../diagram/scene/SceneNodeFactory';
import { SceneNodeModel } from '../diagram/scene/SceneNodeModel';
import OptionLinkFactory from '../diagram/option/OptionLinkFactory';
import { BaseEntityEvent } from '@projectstorm/react-canvas-core';
import { Point } from '@projectstorm/geometry';
import { DagreEngine } from '@projectstorm/react-diagrams-routing';
import OptionLinkModel from '../diagram/option/OptionLinkModel';
import { EventSave } from '@shared/api/EventApi';
import EventImageNodeModel from '../diagram/EventImageNodeModel';

export default class DiagramEngineUtil {
  private static dagreEngine: DagreEngine = new DagreEngine({
    graph: {
      rankdir: 'LR',
      ranker: 'longest-path',
      marginx: 100,
      marginy: 100,
      ranksep: 100,
    },
    includeLinks: false,
  });

  public static createEngine = (): DiagramEngine => {
    const newEngine: DiagramEngine = createEngine();
    newEngine.maxNumberPointsPerLink = 0;
    newEngine.getNodeFactories().registerFactory(new SceneNodeFactory());
    newEngine.getNodeFactories().registerFactory(new OptionNodeFactory());
    newEngine.getNodeFactories().registerFactory(new RewardNodeFactory());
    newEngine.getLinkFactories().registerFactory(new OptionLinkFactory());

    const state = newEngine.getStateMachine().getCurrentState() as DefaultDiagramState;
    state.dragCanvas.config.allowDrag = false;

    const model = new DiagramModel();
    newEngine.setModel(model);

    return newEngine;
  };

  public static createNode(type: SceneType, first: boolean, event?: ISceneBase): EventNodeModel {
    switch (type) {
      case SceneType.OPTION:
        return new OptionNodeModel(first, event as ISceneOption);
      case SceneType.REWARD:
        return new RewardNodeModel(first);
      default:
        return new SceneNodeModel(first, event as IScene);
    }
  }

  public static entityRemoved(event: BaseEntityEvent<EventNodeModel>, model: DiagramModel): void {
    if (event.entity.first) {
      const newFirst = model.getNodes()[1] as EventNodeModel;
      if (newFirst) {
        newFirst.first = true;
        newFirst.removePort(newFirst.inPort);
        model.fireEvent({ newFirst, isCreated: false }, 'nodesUpdated')
      }
    }
  }

  public static getEntityToSave = (engine: DiagramEngine): EventSave => {
    const nodes = engine.getModel().getNodes() as EventNodeModel[];
    const toSave: EventSave = {
      dto: {
        name: 'test',
        scenes: [],
        requirement: {}
      },
      imageToSceneMap: [],
      images: [],
    };
    nodes.forEach((node: EventNodeModel, index: number) => {
      const dto = node.getDto();
      toSave.dto.scenes.push(dto)
      if (node instanceof EventImageNodeModel && node.image) {
        const imageIndex = toSave.images.length;
        toSave.images.push(node.image)
        toSave.imageToSceneMap.push({ sceneIndex: index, imageIndex })
      }
    })
    return toSave;
  }

  public static organize = (engine: DiagramEngine): void => {
    DiagramEngineUtil.dagreEngine.redistribute(engine.getModel());
    engine.getLinkFactories()
      .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
      .calculateRoutingMatrix();
    engine.repaintCanvas();
  }

  public static updateFromEvent = (engine: DiagramEngine) => async (event: IEvent): Promise<void> => {
    const model = new DiagramModel();
    const nodes: EventNodeModel[] = event.scenes.map((scene, index) => {
      const node = DiagramEngineUtil.createNode(scene.type, !index, scene);
      node.setPosition(new Point(500, 500));
      return node;
    });

    const links = nodes.reduce<LinkModel[]>(DiagramEngineUtil.getLinks(event), []);

    model.addAll(...nodes, ...links);
    engine.setModel(model);
    await engine.repaintCanvas(true);
    DiagramEngineUtil.organize(engine);
  }

  private static getLinks = (event: IEvent) => (result: LinkModel[], curr: EventNodeModel, index: number, all: EventNodeModel[]) => {
    if (curr instanceof OptionNodeModel) {
      const option = event.scenes[index] as ISceneOption;
      const nextLinks = option.options.map(o => {
        const link = curr.outPort.link(all[o.next].inPort) as OptionLinkModel;
        link.sceneOption = o;
        return link;
      });
      return [...result, ...nextLinks]
    } else {
      const scene = event.scenes[index] as IScene;
      if (scene.next !== undefined && scene.next != null) {
        return [...result, curr.outPort.link(all[scene.next].inPort)];
      }
    }
    return result;
  };
}
