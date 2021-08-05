import React, { useEffect, useRef } from 'react';
import { SceneNodeModel } from './SceneNodeModel';
import { Card, FormGroup, Intent, TextArea } from '@blueprintjs/core';

type Props = {
  node: SceneNodeModel,
}

export const SceneNodeContent: React.FC<Props> = props => {
  const textAreaRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    textAreaRef.current.value = props.node.text;
    textAreaRef.current.addEventListener('change', () => {
      props.node.setSceneText(textAreaRef.current.value);
    })
  }, [props.node]);

  return (
    <Card>
      <FormGroup label="Scene text" labelInfo="(required)" labelFor="scene-text">
        <TextArea id="scene-text" large={true} intent={Intent.PRIMARY} inputRef={textAreaRef} />
      </FormGroup>
    </Card>
  );
}
