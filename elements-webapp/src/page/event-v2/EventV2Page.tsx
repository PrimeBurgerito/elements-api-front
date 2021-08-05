import { Button } from '@blueprintjs/core';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import React, { useEffect } from 'react';
import TrayItemWidget from '../event/component/TrayItemWidget';
import TrayWidget from '../event/component/TrayWidget';
import './event-diagram.scss';
import { useEventHook } from './hook/eventEngineHook';
import { SceneType } from '@type/Event';
import EventApi from '@shared/api/EventApi';
import { useParams } from 'react-router-dom';
import DiagramEngineUtil from './util/DiagramEngineUtil';

const EventV2Page: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const eventHook = useEventHook();

  useEffect(() => {
    if (id) {
      EventApi.get(id).then(DiagramEngineUtil.updateFromEvent(eventHook.engine));
    }
  }, [eventHook.engine, id])

  const onSubmit = (): void => {
    EventApi.post(DiagramEngineUtil.getDto(eventHook.engine));
  }

  return (
    <div className="diagram-container">
      <div className="diagram-body">
        <div className="header">
          <div className="title">Elements Event Diagram</div>
          <hr />
          <Button intent="primary" onClick={onSubmit}>Submit</Button>
          <Button>Event Configuration</Button>
          <Button onClick={() => console.log(DiagramEngineUtil.getDto(eventHook.engine))}>Test</Button>
        </div>
        <div className="content">
          <TrayWidget>
            <TrayItemWidget model={{ type: SceneType.DEFAULT }} name="Scene" color="rgb(192,255,0)" />
            <TrayItemWidget model={{ type: SceneType.OPTION }} name="Option" color="rgb(0,192,255)" />
            <TrayItemWidget model={{ type: SceneType.REWARD }} name="Reward" color="rgb(192,100,0)" />
          </TrayWidget>
          <div className="diagram-layer" onDrop={eventHook.handleNodeDrop} onDragOver={e => e.preventDefault()}>
            {eventHook.engine && <CanvasWidget className="diagram-container" engine={eventHook.engine} />}
          </div>
        </div>
        {JSON.stringify(eventHook.selectedNode?.serialize(), null, 2)}
      </div>
    </div>
  );
};

export default EventV2Page;
