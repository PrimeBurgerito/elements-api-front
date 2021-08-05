import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import React from 'react';
import EventNodeWidget from '../EventNodeWidget';
import { SceneNodeModel } from './SceneNodeModel';
import { SceneNodeContent } from './SceneNodeContent';
import { SceneType } from '@type/Event';

export default class SceneNodeFactory extends AbstractReactFactory<SceneNodeModel, DiagramEngine> {
  constructor() {
    super(SceneType.DEFAULT);
  }

  generateModel = (_event: GenerateModelEvent): SceneNodeModel => {
    return new SceneNodeModel();
  };

  generateReactWidget = (event: GenerateWidgetEvent<SceneNodeModel>): React.ReactElement => {
    const { model } = event;
    return (
      <EventNodeWidget
        engine={this.engine}
        node={model}
        color="rgb(192,255,0)"
        content={<SceneNodeContent node={model} />}
      />
    );
  };
}
