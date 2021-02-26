import { ControlGroup, NumericInput } from '@blueprintjs/core';
import { INumericProperty } from '@type/statistics';
import React, { useState } from 'react';

type Props = {
  property: INumericProperty;
  value: { first: number, second: number };
  onChange: (item: INumericProperty, min: number, max: number) => void;
};

const RequirementNumericPropertyValueInput: React.FC<Props> = props => {
  const [firstValue, setFirstValue] = useState<number>(props.value.first);
  const [secondValue, setSecondValue] = useState<number>(props.value.second);

  const onFirstChange = (value: number) => {
    if (value > secondValue) {
      value = secondValue;
    }
    setFirstValue(value);
    props.onChange(props.property, value, secondValue);
  };

  const onSecondChange = (value: number) => {
    if (value < firstValue) {
      value = firstValue;
    }
    setSecondValue(value);
    props.onChange(props.property, firstValue, value);
  };

  return (
    <>
      <ControlGroup>
        <NumericInput value={firstValue} onValueChange={onFirstChange} min={props.property.min} max={secondValue} minorStepSize={null} />
        <NumericInput value={secondValue} onValueChange={onSecondChange} min={firstValue} max={props.property.max} minorStepSize={null} />
      </ControlGroup>
    </>
  );
};

export default RequirementNumericPropertyValueInput;
