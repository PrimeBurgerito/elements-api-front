import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import OptionNodeWidget from '@shared/diagram/option/OptionNodeWidget';
import { SceneType } from '@type/Event';
import React from 'react';
import { AbstractNodeFactory, DiagramEngine } from 'storm-react-diagrams';

export default class OptionNodeFactory extends AbstractNodeFactory<OptionNodeModel> {
  public type: SceneType;

  constructor() {
    super('OPTION');
  }

  public generateReactWidget(diagramEngine: DiagramEngine, node: OptionNodeModel): JSX.Element {
    return React.createElement(OptionNodeWidget, {
      node,
      diagramEngine,
    });
  }

  public getNewInstance(initialConfig?: any): OptionNodeModel {
    return new OptionNodeModel();
  }
}
