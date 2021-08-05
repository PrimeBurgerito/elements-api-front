import { Button } from '@blueprintjs/core';
import EventApi from '@shared/api/EventApi';
import { useToggle } from '@shared/hooks/toggleHook';
import { IEventDto, SceneType } from '@type/Event';
import React, { DragEventHandler, useState } from 'react';
import { DiagramWidget } from 'storm-react-diagrams';
import '../event-component.scss';
import TrayItemWidget from '../TrayItemWidget';
import TrayWidget from '../TrayWidget';
import EventConfiguration from './EventConfiguration';
import { useEventEngineHook } from './EventEngine';
import SelectedNode from './SelectedNode';

// @ts-ignore
const useForceUpdate = () => {
  const [value, set] = useState(true);
  return () => set(!value);
};

type PartialEventDto = Pick<IEventDto, 'requirement' | 'name'>;

const EventSandbox: React.FC = () => {
  const forceUpdate = useForceUpdate();
  const {
    selectedNode,
    eventEngine,
    handleNodeDrop,
  } = useEventEngineHook();
  const [configurationOpen, toggleConfiguration] = useToggle(false);
  const [eventFormState, setEventFormState] = useState<PartialEventDto>(null);

  const handleTest = () => {
    console.log(eventEngine.model.getNodes());
    console.log(eventEngine.model.getLinks());
    console.log(eventEngine.collectFormData(eventFormState));
  };

  const handleSubmit = () => {
    const eventDto = eventEngine.collectFormData(eventFormState);
    EventApi.save(eventDto).then(console.log);
  };

  const handleEventConfigurationChange = (value: PartialEventDto): void => {
    setEventFormState({ ...eventFormState, ...value });
  };

  const onNodeDrop: DragEventHandler = event => {
    handleNodeDrop(event);
    forceUpdate();
  };

  return (
    <>
      <div className="diagram-container">
        <div className="diagram-body">
          <div className="header">
            <div className="title">Elements Event Diagram</div>
            <hr />
            <Button intent="primary" onClick={handleSubmit}>Submit</Button>
            <Button onClick={toggleConfiguration}>Event Configuration</Button>
            <Button onClick={handleTest}>Test</Button>
          </div>
          <div className="content">
            <TrayWidget>
              <TrayItemWidget model={{ type: SceneType.DEFAULT }} name="Scene" color="rgb(192,255,0)" />
              <TrayItemWidget model={{ type: SceneType.OPTION }} name="Option" color="rgb(0,192,255)" />
              <TrayItemWidget model={{ type: SceneType.REWARD }} name="Reward" color="rgb(192,100,0)" />
            </TrayWidget>
            <div className="diagram-layer" onDrop={onNodeDrop} onDragOver={event => event.preventDefault()}>
              <DiagramWidget deleteKeys={[46]} className="srd-demo-canvas" diagramEngine={eventEngine.engine} />
            </div>
          </div>
        </div>
        <SelectedNode node={selectedNode} />
      </div>
      <EventConfiguration
        isOpen={configurationOpen}
        onClose={toggleConfiguration}
        onChange={handleEventConfigurationChange}
      />
    </>
  );
};

export default EventSandbox;
