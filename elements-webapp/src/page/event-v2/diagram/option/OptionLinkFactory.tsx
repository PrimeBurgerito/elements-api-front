import { DefaultLinkFactory, DefaultLinkWidget } from '@projectstorm/react-diagrams-defaults';
import { SceneType } from '@type/Event';
import React from 'react';
import OptionLinkModel from './OptionLinkModel';
import OptionLinkSegment from './OptionLinkSegment';
import { GenerateModelEvent, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';

class OptionLinkFactory extends DefaultLinkFactory {
  constructor() {
    super(SceneType.OPTION);
  }

  generateReactWidget(event: GenerateWidgetEvent<OptionLinkModel>): JSX.Element {
    return <DefaultLinkWidget link={event.model} diagramEngine={this.engine} />;
  }

  generateModel(_event: GenerateModelEvent): OptionLinkModel {
    return new OptionLinkModel();
  }

  generateLinkSegment(model: OptionLinkModel, selected: boolean, path: string): React.ReactElement {
    return (
      <g>
        <OptionLinkSegment model={model} path={path} selected={selected} />
      </g>
    );
  }
}

export default OptionLinkFactory;
