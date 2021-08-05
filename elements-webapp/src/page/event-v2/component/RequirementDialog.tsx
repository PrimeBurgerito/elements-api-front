import React, { useState } from 'react';
import { IRequirement } from '@type/Requirement';
import { Button, Classes, Dialog } from '@blueprintjs/core';
import RequirementEdit from '@component/Requirement/RequirementEdit';

type Props = {
  value: IRequirement;
  onChange: (newValue: IRequirement) => void;
};

const RequirementDialog: React.FC<Props> = props => {
  const [requirementOpen, setRequirementOpen] = useState(false);
  return (
    <>
      <Button fill onClick={() => setRequirementOpen(true)}>Requirements</Button>
      <Dialog isOpen={requirementOpen} onClose={() => setRequirementOpen(false)} className={Classes.DARK}>
        <div className={Classes.DIALOG_BODY}>
          <RequirementEdit value={props.value} onChange={props.onChange} locations={true} />
        </div>
      </Dialog>
    </>
  );
}

export default RequirementDialog;
