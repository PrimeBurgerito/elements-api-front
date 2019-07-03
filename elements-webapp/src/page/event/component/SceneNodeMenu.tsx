import { Button } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import * as React from 'react';

const sceneForm: IFormStructure = {
  formElements: {
    text: { label: 'Text', type: FormElementType.TEXT },
  },
};

interface ISceneNodeMenu {
  node: BaseNodeModel;
}

const SceneNodeMenu = (props: ISceneNodeMenu): JSX.Element => {
  const handleChange = (formState: any) => {
    props.node.scene = { ...props.node.scene, ...formState };
  };

  return (
    <>
      {props.node.name}
      <Button onClick={() => console.log(props.node.scene)}>Test node</Button>
      <ElementsForm
        initialFormState={props.node.scene}
        formStructure={sceneForm}
        onChange={handleChange}
        label="Scene configuration"
      />
    </>
  );
};

export default SceneNodeMenu;
