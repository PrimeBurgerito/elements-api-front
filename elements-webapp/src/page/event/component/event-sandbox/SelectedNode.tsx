import { H1 } from '@blueprintjs/core';
import BaseNodeModel from '@shared/diagram/BaseNodeModel';
import OptionNodeModel from '@shared/diagram/option/OptionNodeModel';
import RewardNodeModel from '@shared/diagram/reward/RewardNodeModel';
import React from 'react';
import OptionNodeMenu from '../option-node-menu/OptionNodeMenu';
import RewardNodeMenu from '../reward-node-menu/RewardNodeMenu';
import SceneNodeMenu from '../scene-node-menu/SceneNodeMenu';

type Props = {
  node?: BaseNodeModel,
};

const SelectedNode: React.FC<Props> = ({node}) => {

  return node && (
    <div className="selected-node">
      <H1>{node.name}</H1>
      {node.type === 'OPTION' && <OptionNodeMenu node={node as OptionNodeModel} />}
      {node.type === 'DEFAULT' && <SceneNodeMenu node={node} />}
      {node.type === 'REWARD' && <RewardNodeMenu node={node as RewardNodeModel} />}
    </div>
  );
};

export default SelectedNode;
