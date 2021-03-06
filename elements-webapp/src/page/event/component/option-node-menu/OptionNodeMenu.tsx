import { Button, Collapse, H2 } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import { IOption } from '@type/Event';
import React, { useState } from 'react';
import SceneNodeMenu from '../scene-node-menu/SceneNodeMenu';
import './option-node-menu.scss';

const optionForm: IFormStructure = {
  formElements: {
    text: {label: 'Text', type: FormElementType.TEXT},
    requirement: {label: 'Requirement', type: FormElementType.REQUIREMENT},
  },
};

interface IOptionNodeMenu {
  node: OptionNodeModel;
  onOptionAdd?: () => void;
}

const OptionNodeMenu: React.FC<IOptionNodeMenu> = (props) => {
  const [showOption, setShowOption] = useState<boolean[]>([]);
  const addOptionClick = () => {
    if (props.node.type === 'OPTION') {
      props.node.addOption();
      setShowOption([...showOption, true]);
      props.onOptionAdd();
    }
  };

  const renderOption = (option: IOption, idx: number): JSX.Element => {
    const handleChange = (formState: any) => {
      props.node.scene.options[idx] = {...option, ...formState};
    };
    const toggleOption = () => {
      const newShowOption = [...showOption];
      newShowOption[idx] = !showOption[idx];
      setShowOption(newShowOption);
    };

    return (
      <div key={`option-${idx + 1}-configuration`}>
        <Button className="toggle-option" onClick={toggleOption} text={`Toggle Option ${idx + 1}`} />
        <Collapse keepChildrenMounted isOpen={showOption[idx]}>
          <ElementsForm
            formValue={props.node.scene.options[idx]}
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
      <div className="option-header">
        <H2>Options</H2>
        <Button className="option-button" intent="primary" onClick={addOptionClick}>Add</Button>
      </div>
      {props.node.scene.options.map(renderOption)}
    </>
  );
};

export default OptionNodeMenu;
