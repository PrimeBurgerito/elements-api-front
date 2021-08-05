import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { DefaultDiagramState, DiagramEngine, LinkModel } from '@projectstorm/react-diagrams-core';
import { IEvent, IImageToSceneMap, IScene, ISceneBase, ISceneOption, SceneType } from '@type/Event';
import EventNodeModel from '../diagram/EventNodeModel';
import OptionNodeFactory from '../diagram/option/OptionNodeFactory';
import { OptionNodeModel } from '../diagram/option/OptionNodeModel';
import RewardNodeFactory from '../diagram/reward/RewardNodeFactory';
import { RewardNodeModel } from '../diagram/reward/RewardNodeModel';
import SceneNodeFactory from '../diagram/scene/SceneNodeFactory';
import { SceneNodeModel } from '../diagram/scene/SceneNodeModel';
import OptionLinkFactory from '../diagram/option/OptionLinkFactory';
import { BaseEntityEvent } from '@projectstorm/react-canvas-core';
import { APPLICATION_JSON_OPTION } from '@shared/api/request-template/AxiosInstance';
import { Point } from '@projectstorm/geometry';

export default class DiagramEngineUtil {
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

  public static getDto = (engine: DiagramEngine): FormData => {
    const nodes = engine.getModel().getNodes() as EventNodeModel[];
    const formData = new FormData();
    const imageToSceneMap: IImageToSceneMap[] = [];
    const event = {
      name: 'test',
      scenes: nodes.map(n => n.getDto()),
      requirement: {}
    };
    formData.append('imageToSceneMap', new Blob([JSON.stringify(imageToSceneMap)], APPLICATION_JSON_OPTION));
    formData.append('eventDto', new Blob([JSON.stringify(event)], APPLICATION_JSON_OPTION));
    console.log(event);
    console.log(nodes);
    return formData;
  }

  public static updateFromEvent = (engine: DiagramEngine) => (event: IEvent): void => {
    const model = new DiagramModel();
    const nodes: EventNodeModel[] = event.scenes.map((scene, index) => {
      const node = DiagramEngineUtil.createNode(scene.type, !index);
      node.setPosition(new Point(500, 500));
      return node;
    });

    const links = nodes.reduce<LinkModel[]>((result: LinkModel[], curr: EventNodeModel, index: number, all: EventNodeModel[]) => {
      if (curr instanceof OptionNodeModel) {
        const option = event.scenes[index] as ISceneOption;
        const nextLinks = option.options.map(o => curr.outPort.link(all[o.next].inPort));
        return [...result, ...nextLinks]
      } else {
        const scene = event.scenes[index] as IScene;
        if (scene.next !== undefined && scene.next != null) {
          return [...result, curr.outPort.link(all[scene.next].inPort)];
        }
      }
      return result;
    }, []);


    model.addAll(...nodes, ...links);
    engine.setModel(model);
    engine.repaintCanvas();
  }
}
