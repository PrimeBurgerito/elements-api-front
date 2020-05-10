import { Button, H2 } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import RewardNodeModel from '@shared/diagram/reward/RewardNodeModel';
import { ISceneReward } from '@type/Event';
import * as React from 'react';
import { ReactElement } from 'react';
import './reward-node-menu.scss';

const sceneForm: IFormStructure = {
  formElements: {
    reward: {label: 'Reward', type: FormElementType.REWARD},
  },
};

interface IRewardNodeMenu {
  node: RewardNodeModel;
}

const RewardNodeMenu = (props: IRewardNodeMenu): ReactElement<any> => {

  const handleChange = (formState: ISceneReward) => {
    props.node.scene = {...props.node.scene, ...formState};
  };

  return (
    <>
      <div className="scene-header">
        <Button onClick={() => console.debug(props.node.scene)}>Test node</Button>
        <H2>Reward scene Configuration</H2>
      </div>
      <ElementsForm
        key="reward-scene"
        formValue={props.node.scene}
        formStructure={sceneForm}
        onChange={handleChange}
      />
    </>
  );
};

export default RewardNodeMenu;
