import { Button, H5 } from '@blueprintjs/core';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import React, { useEffect, useState } from 'react';
import TrayItemWidget from '../event/component/TrayItemWidget';
import './event-diagram.scss';
import { useEventHook } from './hook/eventEngineHook';
import { SceneType } from '@type/Event';
import EventApi, { EventSave } from '@shared/api/EventApi';
import { useParams } from 'react-router-dom';
import DiagramEngineUtil from './util/DiagramEngineUtil';
import { IRequirement } from '@type/Requirement';
import RequirementDialog from './component/RequirementDialog';

const EventV2Page: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { engine, handleNodeDrop, selectedNode } = useEventHook();
  const [requirement, setRequirement] = useState<IRequirement>({});

  useEffect(() => {
    if (id) {
      EventApi.get(id).then(e => {
        DiagramEngineUtil.updateFromEvent(engine)(e)
        setRequirement(e.requirement);
      });
    }
  }, [engine, id])

  const onSubmit = (): void => {
    void EventApi.save({ ...getDto(), id });
  }

  const getDto = (): EventSave => {
    const toSave = DiagramEngineUtil.getEntityToSave(engine);
    toSave.dto.requirement = requirement;
    return toSave;
  }

  return (
    <div className="diagram-container">
      <div className="diagram-body-v2">
        <div className="header">
          <div className="title">Elements Event Diagram</div>
          <hr />
          <Button intent="primary" onClick={onSubmit}>Submit</Button>
          <Button onClick={() => DiagramEngineUtil.organize(engine)}>Organize</Button>
          <Button onClick={() => console.log(getDto())}>Test</Button>
        </div>
        <div className="content">
          <div className="tray">
            <H5>Scenes <span className="bp4-text-small bp4-text-muted">(Drag and drop)</span></H5>
            <TrayItemWidget model={{ type: SceneType.DEFAULT }} name="Scene" color="rgb(192,255,0)" />
            <TrayItemWidget model={{ type: SceneType.OPTION }} name="Option" color="rgb(0,192,255)" />
            <TrayItemWidget model={{ type: SceneType.REWARD }} name="Reward" color="rgb(192,100,0)" />
            <H5>Configure</H5>
            <RequirementDialog value={requirement} onChange={setRequirement} />
          </div>
          <div className="diagram-layer" onDrop={handleNodeDrop} onDragOver={e => e.preventDefault()}>
            {engine && <CanvasWidget className="diagram-container" engine={engine} />}
          </div>
        </div>
        {JSON.stringify(selectedNode?.serialize(), null, 2)}
      </div>
    </div>
  );
};

export default EventV2Page;
