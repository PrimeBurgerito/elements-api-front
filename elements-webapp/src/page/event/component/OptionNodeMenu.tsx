import { Button } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import { ISceneOption } from '@type/event';
import * as React from 'react';
import SceneNodeMenu from './SceneNodeMenu';

const optionForm: IFormStructure = {
  formElements: {
    text: { label: 'Text', type: FormElementType.TEXT },
    requirement: { label: 'Requirement', type: FormElementType.REQUIREMENT },
  },
};

interface IOptionNodeMenu {
  node: OptionNodeModel;
  update: () => void;
}

const OptionNodeMenu = (props: IOptionNodeMenu): JSX.Element => {
  const addOptionClick = () => {
    if (props.node.type !== 'OPTION') {
      return;
    }
    props.node.addOption();
    props.update();
  };

  const renderOption = (option: ISceneOption, idx: number): JSX.Element => {
    const handleChange = (formState: any) => {
      props.node.scene.options[idx] = { ...option, ...formState };
    };

    return (
      <>
        <ElementsForm
          initialFormState={props.node.scene.options[idx]}
          key={`option-${idx + 1}-configuration`}
          formStructure={optionForm}
          onChange={handleChange}
          label={`Option ${idx + 1} configuration`} />
      </>
    );
  };

  return (
    <>
      <SceneNodeMenu node={props.node} />
      <Button large intent="primary" onClick={addOptionClick}>Add option</Button>
      {props.node.scene.options.map(renderOption)}
    </>
  );
};

export default OptionNodeMenu;
