import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import React from 'react';
import EventNodeWidget from '../EventNodeWidget';
import { SceneNodeModel } from './SceneNodeModel';

export default class SceneNodeFactory extends AbstractReactFactory<SceneNodeModel, DiagramEngine> {
  constructor() {
    super('DEFAULT');
  }

  generateModel = (event: GenerateModelEvent): SceneNodeModel => {
    return new SceneNodeModel();
  };

  generateReactWidget = (event: GenerateWidgetEvent<SceneNodeModel>): React.ReactElement => {
    return <EventNodeWidget engine={this.engine} node={event.model} color="rgb(192,255,0)" />;
  };
}
