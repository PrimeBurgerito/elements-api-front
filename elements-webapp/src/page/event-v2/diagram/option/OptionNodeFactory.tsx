import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import React from 'react';
import EventNodeWidget from '../EventNodeWidget';
import { OptionNodeModel } from './OptionNodeModel';
import { OptionNodeContent } from './OptionNodeContent';
import { Button, Intent, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import SceneImageAdd from '../../component/SceneImageAdd';

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
      content={
        <>
          <Popover content={<OptionNodeContent node={event.model} />}>
            <Button fill small rightIcon={IconNames.Edit} intent={Intent.PRIMARY}>Edit</Button>
          </Popover>
          <Popover popoverClassName="pr30" content={<SceneImageAdd model={event.model} />}>
            <Button fill small rightIcon={IconNames.Media} intent={Intent.PRIMARY}>Image</Button>
          </Popover>
        </>
      }
    />;
  };
}
