import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import React from 'react';
import EventNodeWidget from '../EventNodeWidget';
import { SceneNodeModel } from './SceneNodeModel';
import { SceneNodeContent } from './SceneNodeContent';
import { SceneType } from '@type/Event';
import { Button, Intent, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import SceneImageAdd from '../../component/SceneImageAdd';

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
        content={
          <>
            <Popover content={<SceneNodeContent node={model} />}>
              <Button fill small rightIcon={IconNames.Edit} intent={Intent.PRIMARY}>Edit</Button>
            </Popover>
            <Popover popoverClassName="pr30" content={<SceneImageAdd model={model} />}>
              <Button fill small rightIcon={IconNames.Media} intent={Intent.PRIMARY}>Image</Button>
            </Popover>
          </>
        }
      />
    );
  };
}
