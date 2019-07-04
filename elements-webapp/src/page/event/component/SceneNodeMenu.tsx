import { Button, FileInput } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import * as React from 'react';
import { useEffect, useState } from 'react';

const sceneForm: IFormStructure = {
  formElements: {
    text: { label: 'Text', type: FormElementType.TEXT },
  },
};

interface ISceneNodeMenu {
  node: BaseNodeModel;
}

const SceneNodeMenu = (props: ISceneNodeMenu): JSX.Element => {
  const [imageFile, setImageFile] = useState<File>(null);

  useEffect(() => {
    setImageFile(props.node.image);
  }, [props.node.image]);

  const handleChange = (formState: any) => {
    props.node.scene = { ...props.node.scene, ...formState };
  };

  const onImageAdd = ({ target }) => {
    setImageFile(target.files[0]);
    props.node.image = target.files[0];
  };

  return (
    <>
      {props.node.name}
      <Button onClick={() => console.log(props.node.scene)}>Test node</Button>
      <ElementsForm
        key="default-scene"
        initialFormState={props.node.scene}
        formStructure={sceneForm}
        onChange={handleChange}
        label="Scene configuration"
      />
      <FileInput fill text="Choose image" onChange={onImageAdd} />
      {imageFile && <img className="dialog-img" src={URL.createObjectURL(imageFile)} alt="No image" />}
    </>
  );
};

export default SceneNodeMenu;
