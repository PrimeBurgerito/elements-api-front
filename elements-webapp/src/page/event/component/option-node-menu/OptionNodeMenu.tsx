import { Button, Collapse, H2 } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import { ISceneOption } from '@type/event';
import * as React from 'react';
import { useState } from 'react';
import SceneNodeMenu from '../SceneNodeMenu';
import './option-node-menu.scss';

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
  const [showOption, setShowOption] = useState<boolean[]>([]);
  const addOptionClick = () => {
    if (props.node.type !== 'OPTION') {
      return;
    }
    props.node.addOption();
    setShowOption([...showOption, true]);
    props.update();
  };

  const renderOption = (option: ISceneOption, idx: number): JSX.Element => {
    const handleChange = (formState: any) => {
      props.node.scene.options[idx] = { ...option, ...formState };
    };
    const toggleOption = () => {
      const newShowOption = [...showOption];
      newShowOption[idx] = !showOption[idx];
      setShowOption(newShowOption);
    };

    return (
      <div key={`option-${idx + 1}-configuration`}>
        <Button fill onClick={toggleOption} text={`Toggle Option ${idx + 1}`} />
        <Collapse isOpen={showOption[idx]}>
          <ElementsForm
            initialFormState={props.node.scene.options[idx]}
            formStructure={optionForm}
            onChange={handleChange}
            label={`Option ${idx + 1} configuration`} />
        </Collapse>
      </div>
    );
  };

  return (
    <>
      <SceneNodeMenu node={props.node} />
      <H2>Options</H2>
      <Button className="option-button" large intent="primary" onClick={addOptionClick}>Add option</Button>
      {props.node.scene.options.map(renderOption)}
    </>
  );
};

export default OptionNodeMenu;
