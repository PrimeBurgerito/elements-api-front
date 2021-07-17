import { Button } from '@blueprintjs/core';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import React from 'react';
import TrayItemWidget from '../event/component/TrayItemWidget';
import TrayWidget from '../event/component/TrayWidget';
import './event-diagram.scss';
import { useEventHook } from './hook/eventEngineHook';


const EventV2Page: React.FC = () => {
  const eventHook = useEventHook();

  return (
    <div className="diagram-container">
      <div className="diagram-body">
        <div className="header">
          <div className="title">Elements Event Diagram</div>
          <hr />
          <Button intent="primary">Submit</Button>
          <Button>Event Configuration</Button>
          <Button>Test</Button>
        </div>
        <div className="content">
          <TrayWidget>
            <TrayItemWidget model={{ type: 'DEFAULT' }} name="Scene" color="rgb(192,255,0)" />
            <TrayItemWidget model={{ type: 'OPTION' }} name="Option" color="rgb(0,192,255)" />
            <TrayItemWidget model={{ type: 'REWARD' }} name="Reward" color="rgb(192,100,0)" />
          </TrayWidget>
          <div className="diagram-layer" onDrop={eventHook.handleNodeDrop} onDragOver={event => event.preventDefault()}>
            {eventHook.engine && <CanvasWidget className="diagram-container" engine={eventHook.engine} />}
          </div>
        </div>
        {JSON.stringify(eventHook.selectedNode?.serialize())}
      </div>
    </div>
  );
};

export default EventV2Page;
