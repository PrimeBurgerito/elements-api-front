import { SceneType } from '@type/Event';
import React from 'react';
import { AbstractNodeFactory, DiagramEngine } from 'storm-react-diagrams';
import RewardNodeModel from './RewardNodeModel';
import RewardNodeWidget from './RewardNodeWidget';

export default class RewardNodeFactory extends AbstractNodeFactory<RewardNodeModel> {
  public type: SceneType;

  constructor() {
    super('REWARD');
  }

  public generateReactWidget(diagramEngine: DiagramEngine, node: RewardNodeModel): JSX.Element {
    return React.createElement(RewardNodeWidget, {
      node,
      diagramEngine,
    });
  }

  public getNewInstance(initialConfig?: any): RewardNodeModel {
    return new RewardNodeModel();
  }
}
