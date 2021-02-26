import { Button, Card, Classes, Dialog, FileInput, FormGroup, H2, H3, InputGroup } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import { errorNotice } from '@shared/notice/notices';
import { IScene } from '@type/Event';
import React, { ClipboardEventHandler, useEffect, useMemo, useState } from 'react';
import './scene-node-menu.scss';

const sceneForm: IFormStructure = {
  formElements: {
    text: {label: 'Text', type: FormElementType.TEXT},
  },
};

type Props = {
  node: BaseNodeModel;
};

const SceneNodeMenu: React.FC<Props> = props => {
  const [imageFile, setImageFile] = useState<File>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [pasteInputText, setPasteInputText] = useState<string>('');

  useEffect(() => {
    setImageFile(props.node.image);
  }, [props.node.image]);

  const handleChange = (formState: IScene) => {
    props.node.scene = {...props.node.scene, ...formState};
  };

  const onImageAdd = ({target}) => {
    setImageFile(target.files[0]);
    props.node.image = target.files[0];
  };

  const onImagePaste: ClipboardEventHandler = e => {
    const file = e.clipboardData.files.length === 1 && e.clipboardData.files[0];
    if (file) {
      if (file.type.startsWith('image')) {
        setPasteInputText(file.name);
        setImageFile(file);
        props.node.image = file;
      } else {
        errorNotice(`Pasted file (${file.type}) does not seem like an image!`);
      }
    } else {
      errorNotice('No files in clipboard!');
    }
  };

  const memoizedImage: string = useMemo<string>(() => !!imageFile ? URL.createObjectURL(imageFile) : '', [imageFile]);

  return (
    <>
      <div className="scene-header">
        <Button onClick={() => console.log(props.node.scene)}>Test node</Button>
        <H2>Scene Configuration</H2>
      </div>
      <ElementsForm key="default-scene" formValue={props.node.scene} formStructure={sceneForm} onChange={handleChange} />
      <Card>
        <H3>Image</H3>
        <FormGroup label="Add image" labelFor="image-input">
          <FileInput id="image-input" fill text="Choose Image" onChange={onImageAdd} />
        </FormGroup>
        <p>OR</p>
        <FormGroup label="Paste image from clipboard" labelInfo="(Ctrl + V)" labelFor="image-paste">
          <InputGroup id="image-paste" readOnly value={pasteInputText} placeholder="Paste image..." fill onPaste={onImagePaste} />
        </FormGroup>
        <Button fill disabled={!imageFile} onClick={() => setShowImage(!showImage)} text="Toggle image" />
        <Dialog className="scene-dialog" isOpen={showImage} onClose={() => setShowImage(false)}>
          <div className={Classes.DIALOG_BODY}>
            {imageFile && <img src={memoizedImage} alt="No image" />}
          </div>
        </Dialog>
      </Card>
    </>
  );
};

export default SceneNodeMenu;
