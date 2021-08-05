import React, { useEffect, useRef, useState } from 'react';
import { Card, FormGroup, H4, Intent, Tab, Tabs, TextArea } from '@blueprintjs/core';
import { OptionNodeModel } from './OptionNodeModel';
import OptionLinkModel from './OptionLinkModel';

type SceneOptionProps = {
  option: OptionLinkModel,
  index: number,
}

const SceneOption: React.FC<SceneOptionProps> = props => {
  const textAreaRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    textAreaRef.current.value = props.option.sceneOption.text;
    textAreaRef.current.addEventListener('change', () => {
      props.option.sceneOption.text = textAreaRef.current.value;
    })
  }, [props.option]);

  return (
    <FormGroup label="Option text" labelInfo="(required)" labelFor="scene-text">
      <TextArea id="scene-text" large={true} intent={Intent.PRIMARY} inputRef={textAreaRef} />
    </FormGroup>
  );
}

type Props = {
  node: OptionNodeModel,
}

export const OptionNodeContent: React.FC<Props> = props => {
  const textAreaRef = useRef<HTMLTextAreaElement>()
  const [tab, setTab] = useState<string | number>(0);

  useEffect(() => {
    textAreaRef.current.value = props.node.text;
    textAreaRef.current.addEventListener('change', () => {
      props.node.setSceneText(textAreaRef.current.value);
    })
  }, [props.node]);

  const renderOptionTab = (option: OptionLinkModel, index: number): React.ReactElement => {
    return <Tab
      id={index}
      title={`Option (${index + 1})`}
      key={`option-${index}`}
      panel={<SceneOption option={option} index={index} />}
    />
  }

  return (
    <Card>
      <FormGroup label="Scene text" labelInfo="(required)" labelFor="scene-text">
        <TextArea id="scene-text" large={true} intent={Intent.PRIMARY} inputRef={textAreaRef} />
      </FormGroup>
      <H4>Options</H4>
      <Tabs onChange={setTab} selectedTabId={tab} renderActiveTabPanelOnly>
        {props.node.sceneOptions.map(renderOptionTab)}
      </Tabs>
    </Card>
  );
}
