import { Classes, Drawer } from '@blueprintjs/core';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import { FormElementType, IFormStructure } from '@component/ElementsForm/ElementsFormResource';
import { IEventDto } from '@type/Event';
import React, { useState } from 'react';

const eventForm: IFormStructure = {
  formElements: {
    name: {label: 'Event name', type: FormElementType.TEXT},
    requirement: {label: 'Requirement', type: FormElementType.REQUIREMENT},
  },
};
type PartialEventDto = Pick<IEventDto, 'requirement' | 'name'>;
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (value: PartialEventDto) => void;
};


const EventConfiguration: React.FC<Props> = props => {
  const [eventFormState, setEventFormState] = useState<PartialEventDto>(null);

  const onEventChange = (formState: any): void => {
    const newFormState = {...eventFormState, ...formState};
    setEventFormState(newFormState);
    props.onChange(newFormState);
  };

  return (
    <Drawer
      className={Classes.DARK}
      position="left"
      isOpen={props.isOpen}
      title="Event Configuration"
      onClose={props.onClose}
    >
      <div className={Classes.DRAWER_BODY}>
        <div className={Classes.DIALOG_BODY}>
          <ElementsForm formValue={eventFormState} formStructure={eventForm} onChange={onEventChange} />
        </div>
      </div>
    </Drawer>
  );
};

export default EventConfiguration;
