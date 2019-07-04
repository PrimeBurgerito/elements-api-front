import { Button, Card, Collapse, FileInput, H2, H3 } from '@blueprintjs/core';
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
  const [showImage, setShowImage] = useState<boolean>(true);

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
      <Button onClick={() => console.log(props.node.scene)}>Test node</Button>
      <H2>Scene Configuration</H2>
      <ElementsForm
        key="default-scene"
        initialFormState={props.node.scene}
        formStructure={sceneForm}
        onChange={handleChange}
      />
      <Card>
        <H3>Image</H3>
        <FileInput fill text="Choose Image" onChange={onImageAdd} />
        <Button fill disabled={!imageFile} onClick={() => setShowImage(!showImage)} text="Toggle image" />
        <Collapse isOpen={showImage}>
          {imageFile && <img className="dialog-img" src={URL.createObjectURL(imageFile)} alt="No image" />}
        </Collapse>
      </Card>
    </>
  );
};

export default SceneNodeMenu;
