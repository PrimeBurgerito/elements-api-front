import { Button, Card, Classes, ControlGroup, Dialog, FileInput, H2, H3 } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import { ISceneDto } from '@type/event'
import * as React from 'react';
import { useEffect, useState } from 'react';
import './scene-node-menu.scss';

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
  const [showImage, setShowImage] = useState<boolean>(false);

  useEffect(() => {
    setImageFile(props.node.image);
  }, [props.node.image]);

  const handleChange = (formState: ISceneDto) => {
    props.node.scene = { ...props.node.scene, ...formState };
  };

  const onImageAdd = ({ target }) => {
    setImageFile(target.files[0]);
    props.node.image = target.files[0];
  };

  return (
    <>
      <div className="scene-header">
        <Button onClick={() => console.log(props.node.scene)}>Test node</Button>
        <H2>Scene Configuration</H2>
      </div>
      <ElementsForm
        key="default-scene"
        formValue={props.node.scene}
        formStructure={sceneForm}
        onChange={handleChange}
      />
      <Card>
        <H3>Image</H3>
        <ControlGroup vertical>
          <FileInput fill text="Choose Image" onChange={onImageAdd} />
          <Button fill disabled={!imageFile} onClick={() => setShowImage(!showImage)} text="Toggle image" />
        </ControlGroup>
        <Dialog className="scene-dialog" isOpen={showImage} onClose={() => setShowImage(false)}>
          <div className={Classes.DIALOG_BODY}>
            {imageFile && <img src={URL.createObjectURL(imageFile)} alt="No image" />}
          </div>
        </Dialog>
      </Card>
    </>
  );
};

export default SceneNodeMenu;
