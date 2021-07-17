import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import React from 'react';
import EventNodeWidget from '../EventNodeWidget';
import { RewardNodeModel } from './RewardNodeModel';

export default class RewardNodeFactory extends AbstractReactFactory<RewardNodeModel, DiagramEngine> {
  constructor() {
    super('REWARD');
  }

  generateModel = (event: GenerateModelEvent): RewardNodeModel => {
    return new RewardNodeModel();
  };

  generateReactWidget = (event: GenerateWidgetEvent<RewardNodeModel>): React.ReactElement => {
    return <EventNodeWidget engine={this.engine} node={event.model} color="rgb(192,100,0)" />;
  };
}
