import SceneNodeModel from '@shared/diagram/scene/SceneNodeModel';
import SceneNodeWidget from '@shared/diagram/scene/SceneNodeWidget';
import { SceneType } from '@type/Event';
import * as React from 'react';
import { AbstractNodeFactory, DiagramEngine } from 'storm-react-diagrams';

export default class SceneNodeFactory extends AbstractNodeFactory<SceneNodeModel> {
  public type: SceneType;

  constructor() {
    super('DEFAULT');
  }

  public generateReactWidget(diagramEngine: DiagramEngine, node: SceneNodeModel): JSX.Element {
    return React.createElement(SceneNodeWidget, {
      node,
      diagramEngine,
    });
  }

  public getNewInstance(initialConfig?: any): SceneNodeModel {
    return new SceneNodeModel();
  }
}
