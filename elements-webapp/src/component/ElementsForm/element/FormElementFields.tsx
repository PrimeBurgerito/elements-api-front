import { Checkbox, InputGroup, NumericInput, TagInput } from '@blueprintjs/core';
import ArrayInput from '@component/ElementsForm/element/ArrayInput';
import AttributesInput from '@component/ElementsForm/element/AttributesInput';
import LocationInput from '@component/ElementsForm/element/LocationInput';
import MultiStringSelect from '@component/ElementsForm/element/MultiStringSelect';
import PropertiesInput from '@component/ElementsForm/element/PropertiesInput';
import RequirementInput from '@component/ElementsForm/element/RequirementInput';
import RewardInput from '@component/ElementsForm/element/RewardInput';
import TimingInput from '@component/ElementsForm/element/TimingInput';
import {
  FormArray,
  FormAttribute,
  FormElement,
  FormElementType,
  FormLocation,
  FormMultiSelect,
  FormNumeric,
  FormProperty,
  FormRequirement,
  FormReward,
  FormTag,
  FormText,
  FormTimingSelect
} from '@component/ElementsForm/ElementsFormResource';
import * as React from 'react';

type SharedProps<F extends FormElement<any>> = {
  commonProps: {
    key: string;
    formState: object;
    onChange: (key: string, change) => void;
  }
  formElement: F;
};

const NumericField = (props: SharedProps<FormNumeric>) => (<NumericInput
  id={props.commonProps.key}
  min={props.formElement.min}
  max={props.formElement.max}
  value={props.commonProps.formState[props.commonProps.key] || 0}
  onValueChange={(value) => props.commonProps.onChange(props.commonProps.key, value)}
/>);

const TextField = (props: Omit<SharedProps<FormText>, 'formElement'>) => (<InputGroup
  id={props.commonProps.key}
  value={props.commonProps.formState[props.commonProps.key] || ''}
  onChange={({target}) => props.commonProps.onChange(props.commonProps.key, target.value)}
/>);

const TagField = (props: Omit<SharedProps<FormTag>, 'formElement'>) => (<TagInput
  values={props.commonProps.formState[props.commonProps.key] || []}
  onChange={(values: string[]) => props.commonProps.onChange(props.commonProps.key, values)}
/>);

const PropertyField = (props: Omit<SharedProps<FormProperty>, 'formElement'>) => (<PropertiesInput
  id={props.commonProps.key}
  propertiesValue={props.commonProps.formState[props.commonProps.key]}
  onChange={(prop) => props.commonProps.onChange(props.commonProps.key, prop)}
/>);

const AttributeField = (props: Omit<SharedProps<FormAttribute>, 'formElement'>) => (<AttributesInput
  id={props.commonProps.key}
  attributesValue={props.commonProps.formState[props.commonProps.key]}
  onChange={(attr) => props.commonProps.onChange(props.commonProps.key, attr)}
/>);

const MultiStringField = (props: SharedProps<FormMultiSelect>) => (<MultiStringSelect
  values={props.commonProps.formState[props.commonProps.key]}
  selectableValues={props.formElement.selectableValues || []}
  onChange={(values) => props.commonProps.onChange(props.commonProps.key, values)}
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
  formElement: FormElement<F>,
  onChange: (key: string, change) => void,
  formState: object
) => {
  const commonProps = {key, formState, onChange};
  switch (formElement.type) {
    case FormElementType.NUMERIC:
      return <NumericField commonProps={commonProps} formElement={formElement as FormNumeric} />;
    case FormElementType.TEXT:
      return <TextField commonProps={commonProps} />;
    case FormElementType.TAG:
      return <TagField commonProps={commonProps} />;
    case FormElementType.PROPERTY:
      return <PropertyField commonProps={commonProps} />;
    case FormElementType.ATTRIBUTE:
      return <AttributeField commonProps={commonProps} />;
    case FormElementType.MULTISELECT:
      return <MultiStringField commonProps={commonProps} formElement={formElement as FormMultiSelect} />;
    case FormElementType.TIMING:
      return <TimingField commonProps={commonProps} />;
    case FormElementType.REQUIREMENT:
      return <RequirementField commonProps={commonProps} />;
    case FormElementType.BOOLEAN:
      return <BooleanField commonProps={commonProps} />;
    case FormElementType.LOCATION:
      return <LocationField commonProps={commonProps} formElement={formElement as FormLocation} />;
    case FormElementType.REWARD:
      return <RewardField commonProps={commonProps} />;
    case FormElementType.ARRAY:
      return <ArrayField commonProps={commonProps} formElement={formElement as FormArray} />;
    default:
      throw new Error('No such field!');
  }
};
