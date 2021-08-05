import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import React from 'react';
import EventNodeWidget from '../EventNodeWidget';
import { OptionNodeModel } from './OptionNodeModel';
import { OptionNodeContent } from './OptionNodeContent';

export default class OptionNodeFactory extends AbstractReactFactory<OptionNodeModel, DiagramEngine> {
  constructor() {
    super('OPTION');
  }

  generateModel = (_event: GenerateModelEvent): OptionNodeModel => {
    return new OptionNodeModel();
  };

  generateReactWidget = (event: GenerateWidgetEvent<OptionNodeModel>): React.ReactElement => {
    return <EventNodeWidget
      engine={this.engine}
      node={event.model}
      color="rgb(0,192,255)"
      content={<OptionNodeContent node={event.model} />}
    />;
  };
}
