import { Checkbox, InputGroup, NumericInput, TagInput } from '@blueprintjs/core';
import ArrayInput from '@component/ElementsForm/element/ArrayInput';
import LocationInput from '@component/ElementsForm/element/LocationInput';
import NumericPropertyInput from '@component/ElementsForm/element/NumericPropertyInput';
import RequirementInput from '@component/ElementsForm/element/RequirementInput';
import RewardInput from '@component/ElementsForm/element/RewardInput';
import StringPropertyInput from '@component/ElementsForm/element/StringPropertyInput';
import TimingInput from '@component/ElementsForm/element/TimingInput';
import ElementsForm from '@component/ElementsForm/ElementsForm';
import {
  FormArray,
  FormComponentBaseProps,
  FormComponentProps,
  FormElementType,
  FormLocation,
  FormNested,
  FormNumeric,
  FormNumericProperty,
  FormRequirement,
  FormReward,
  FormSelect,
  FormStringProperty,
  FormTag,
  FormText,
  FormTimingSelect
} from '@component/ElementsForm/ElementsFormResource';
import * as React from 'react';
import MultiStringSelect from './MultiStringSelect';
import StringSelect from './StringSelect';

type SharedProps<F extends FormComponentBaseProps<any>> = {
  commonProps: {
    key: string;
    formState: object;
    onChange: (key: string, change) => void;
  }
  formElement: F;
};

const NumericField: React.FC<SharedProps<FormNumeric>> = (props) => {
  return <NumericInput
    id={props.commonProps.key}
    min={props.formElement.min}
    max={props.formElement.max}
    value={props.commonProps.formState[props.commonProps.key] || NumericInput.VALUE_ZERO}
    onValueChange={(value) => props.commonProps.onChange(props.commonProps.key, value)}
  />;
};

const TextField = (props: Omit<SharedProps<FormText>, 'formElement'>) => (<InputGroup
  id={props.commonProps.key}
  value={props.commonProps.formState[props.commonProps.key] || ''}
  onChange={({target}) => props.commonProps.onChange(props.commonProps.key, target.value)}
/>);

const TagField = (props: Omit<SharedProps<FormTag>, 'formElement'>) => (<TagInput
  values={props.commonProps.formState[props.commonProps.key] || []}
  onChange={(values: string[]) => props.commonProps.onChange(props.commonProps.key, values)}
/>);

const StringPropertyField = (props: Omit<SharedProps<FormStringProperty>, 'formElement'>) => (<StringPropertyInput
  id={props.commonProps.key}
  propertiesValue={props.commonProps.formState[props.commonProps.key]}
  onChange={(prop) => props.commonProps.onChange(props.commonProps.key, prop)}
/>);

const NumericPropertyField = (props: Omit<SharedProps<FormNumericProperty>, 'formElement'>) => (<NumericPropertyInput
  id={props.commonProps.key}
  attributesValue={props.commonProps.formState[props.commonProps.key]}
  onChange={(attr) => props.commonProps.onChange(props.commonProps.key, attr)}
/>);

const MultiStringSelectField = (props: SharedProps<FormSelect>) => (<MultiStringSelect
  values={props.commonProps.formState[props.commonProps.key]}
  selectableValues={props.formElement.selectableValues || []}
  onChange={(values) => props.commonProps.onChange(props.commonProps.key, values)}
/>);

const StringSelectField = (props: SharedProps<FormSelect>) => (<StringSelect
  value={props.commonProps.formState[props.commonProps.key]}
  selectableValues={props.formElement.selectableValues || []}
  onChange={(value) => props.commonProps.onChange(props.commonProps.key, value)}
/>);

const TimingField = (props: Omit<SharedProps<FormTimingSelect>, 'formElement'>) => (<TimingInput
  value={props.commonProps.formState[props.commonProps.key]}
  onChange={(values) => props.commonProps.onChange(props.commonProps.key, values)}
/>);

const RequirementField = (props: Omit<SharedProps<FormRequirement>, 'formElement'>) => (<RequirementInput
  value={props.commonProps.formState[props.commonProps.key]}
  onChange={(values) => props.commonProps.onChange(props.commonProps.key, values)}
/>);

const LocationField = (props: SharedProps<FormLocation>) => (<LocationInput
  value={props.commonProps.formState[props.commonProps.key]}
  caching={props.formElement.caching}
  onChange={(value) => props.commonProps.onChange(props.commonProps.key, value)}
/>);

const ArrayField = (props: SharedProps<FormArray>) => (<ArrayInput
  arrayValue={props.commonProps.formState[props.commonProps.key]}
  formStructure={props.formElement.formStructure}
  onChange={(value) => props.commonProps.onChange(props.commonProps.key, value)}
/>);

const NestedField = (props: SharedProps<FormNested>) => (<ElementsForm
  formStructure={props.formElement.formStructure}
  onChange={(value) => props.commonProps.onChange(props.commonProps.key, value)}
  formValue={props.commonProps.formState[props.commonProps.key]}
/>);

const BooleanField = (props: Omit<SharedProps<FormArray>, 'formElement'>) => (<Checkbox
  checked={!!props.commonProps.formState[props.commonProps.key]}
  onChange={({target}) => props.commonProps.onChange(props.commonProps.key, target['checked'])}
/>);

const RewardField = (props: Omit<SharedProps<FormReward>, 'formElement'>) => (<RewardInput
  rewardValue={props.commonProps.formState[props.commonProps.key]}
  onChange={(reward) => props.commonProps.onChange(props.commonProps.key, reward)}
/>);


export const chooseFieldByType = <F extends FormElementType>(
  key: string,
  formElement: FormComponentProps,
  onChange: (key: string, change) => void,
  formState: object
): React.ReactElement => {
  const commonProps = {key, formState, onChange};
  switch (formElement.type) {
    case FormElementType.NUMERIC:
      return <NumericField key={`numeric-input-${commonProps.key}`} commonProps={commonProps} formElement={formElement} />;
    case FormElementType.TEXT:
      return <TextField commonProps={commonProps} />;
    case FormElementType.TAG:
      return <TagField commonProps={commonProps} />;
    case FormElementType.STRING_PROPERTY:
      return <StringPropertyField commonProps={commonProps} />;
    case FormElementType.NUMERIC_PROPERTY:
      return <NumericPropertyField commonProps={commonProps} />;
    case FormElementType.MULTI_SELECT:
      return <MultiStringSelectField commonProps={commonProps} formElement={formElement} />;
    case FormElementType.SELECT:
      return <StringSelectField commonProps={commonProps} formElement={formElement} />;
    case FormElementType.TIMING:
      return <TimingField commonProps={commonProps} />;
    case FormElementType.REQUIREMENT:
      return <RequirementField commonProps={commonProps} />;
    case FormElementType.BOOLEAN:
      return <BooleanField commonProps={commonProps} />;
    case FormElementType.LOCATION:
      return <LocationField commonProps={commonProps} formElement={formElement} />;
    case FormElementType.REWARD:
      return <RewardField commonProps={commonProps} />;
    case FormElementType.ARRAY:
      return <ArrayField commonProps={commonProps} formElement={formElement} />;
    case FormElementType.NESTED:
      return <NestedField commonProps={commonProps} formElement={formElement} />;
    default:
      throw new Error('No such field!');
  }
};
