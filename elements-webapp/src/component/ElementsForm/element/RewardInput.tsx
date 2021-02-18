import { Button, Divider, FormGroup, MenuItem, NumericInput, Switch } from '@blueprintjs/core';
import { IItemRendererProps, ItemRenderer, Select } from '@blueprintjs/select';
import MultiStringSelect from '@component/ElementsForm/element/MultiStringSelect';
import numericPropertyApi from '@shared/api/statistic/NumericPropertyApi';
import objectiveApi from '@shared/api/statistic/ObjectiveApi';
import stringPropertyApi from '@shared/api/statistic/StringPropertyApi';
import { INumericPropertyReward, IObjectiveReward, IReward, IStringPropertyReward } from '@type/Reward';
import { INumericProperty, IObjective, IProperty, IStringProperty, StringPropertyType } from '@type/statistics';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

type Props = {
  id?: string;
  rewardValue?: IReward;
  onChange: (properties: IReward) => void;
};

const useGameProperties = (): [IStringProperty[], INumericProperty[], IObjective[]] => {
  const [stringProperties, setStringProperties] = useState<IStringProperty[]>([]);
  const [numericProperties, setNumericProperties] = useState<INumericProperty[]>([]);
  const [objectives, setObjectives] = useState<IObjective[]>([]);

  useEffect(() => {
    Promise.all([
      numericPropertyApi.find(true),
      stringPropertyApi.find(true),
      objectiveApi.find(true)
    ]).then(([numericProps, stringProps, objective]: [INumericProperty[], IStringProperty[], IObjective[]]) => {
      setNumericProperties(numericProps);
      setStringProperties(stringProps);
      setObjectives(objective);
    });
  }, []);

  return [stringProperties, numericProperties, objectives];
};

const RewardInput: React.FC<Props> = (props) => {
  const [stringProperties, numericProperties, objectives] = useGameProperties();
  const [selectedStringPropReward, setSelectedStringPropReward] = useState<IStringPropertyReward>(null);
  const [selectedNumericPropReward, setSelectedNumericPropReward] = useState<INumericPropertyReward>(null);
  const [selectedObjectiveReward, setSelectedObjectiveReward] = useState<IObjectiveReward>(null);
  const [reward, setReward] = useState<IReward>({numericProperties: [], objectives: [], stringProperties: []});

  const PropertySelect = Select.ofType<IStringProperty>();
  const NumericPropertySelect = Select.ofType<INumericProperty>();
  const ObjectiveSelect = Select.ofType<IObjective>();

  useEffect(() => {
    if (props.rewardValue) {
      setReward(props.rewardValue);
    }
  }, [props.rewardValue]);

  const renderSelectItem = <T extends IProperty<any>>(): ItemRenderer<T> => (item: T, itemProps: IItemRendererProps) => {
    return <MenuItem active={itemProps.modifiers.active} key={item.key} text={item.name} onClick={itemProps.handleClick} />;
  };

  const renderSelectObjective: ItemRenderer<IObjective> = (item: IObjective, itemProps: IItemRendererProps) => {
    return <MenuItem active={itemProps.modifiers.active} key={item.id} text={item.value} onClick={itemProps.handleClick} />;
  };

  const renderPropertyReward = (): ReactElement => {
    const setSelectedPropertyReward = (property: IStringProperty) => setSelectedStringPropReward({
      propertyKey: property.key,
      value: property.type === StringPropertyType.MULTIPLE ? property.value : [property.value[0]],
      type: 'ADD'
    });
    const onTypeChange = ({target}) => setSelectedStringPropReward({
      ...selectedStringPropReward,
      type: target['checked'] ? 'ADD' : 'REMOVE'
    });
    const addNewProperty = () => {
      const newReward: IReward = {...reward, stringProperties: [...reward.stringProperties, selectedStringPropReward]};
      setReward(newReward);
      props.onChange(newReward);
    };
    const selectables = selectedStringPropReward ? stringProperties.find((p) => p.key === selectedStringPropReward.propertyKey).value : [];
    return (
      <FormGroup label="Property">
        <PropertySelect items={stringProperties} itemRenderer={renderSelectItem<IStringProperty>()} onItemSelect={setSelectedPropertyReward}
                        noResults={<MenuItem disabled={true} text="No results." />} filterable={false}>
          <Button text={selectedStringPropReward ? selectedStringPropReward.value : '(No selection)'} rightIcon="double-caret-vertical" />
        </PropertySelect>
        <Switch disabled={!selectedStringPropReward} label="Add / Remove" onChange={onTypeChange} />
        <MultiStringSelect
          selectableValues={selectables}
          values={selectedStringPropReward?.value || []}
          onChange={(item: string[]) => setSelectedStringPropReward({...selectedStringPropReward, value: item})}
        />
        <Button disabled={!selectedStringPropReward} onClick={addNewProperty}>Add property reward</Button>
      </FormGroup>
    );
  };

  const renderAttributeReward = (): ReactElement => {
    const selectNumericProperty = (property: INumericProperty) => setSelectedNumericPropReward({
      propertyKey: property.key,
      value: property.min,
      type: 'ADD'
    });
    const valueChange = (value: number) => setSelectedNumericPropReward({...selectedNumericPropReward, value});
    const addNewAttribute = () => {
      const newReward: IReward = {...reward, numericProperties: [...reward.numericProperties, selectedNumericPropReward]};
      setReward(newReward);
      props.onChange(newReward);
    };
    const buttonText = selectedNumericPropReward ? selectedNumericPropReward.propertyKey : '(No selection)';
    return (
      <FormGroup label="Attribute">
        <NumericPropertySelect filterable={false} items={numericProperties} itemRenderer={renderSelectItem<INumericProperty>()}
                               onItemSelect={selectNumericProperty}>
          <Button text={buttonText} rightIcon="double-caret-vertical" />
        </NumericPropertySelect>
        <NumericInput disabled={!selectedNumericPropReward} value={selectedNumericPropReward ? selectedNumericPropReward.value : 0}
                      onValueChange={valueChange} />
        <Button disabled={!selectedNumericPropReward} onClick={addNewAttribute}>Add attribute reward</Button>
      </FormGroup>
    );
  };

  const renderObjectiveReward = (): ReactElement => {
    const selectObjective = (objective: IObjective) => setSelectedObjectiveReward({objectiveKey: objective.value, type: 'ADD'});
    const onTypeChange = ({target}) => setSelectedObjectiveReward({...selectedObjectiveReward, type: target['checked'] ? 'ADD' : 'REMOVE'});
    const addNewObjective = () => {
      const newReward: IReward = {...reward, objectives: [...reward.objectives, selectedObjectiveReward]};
      setReward(newReward);
      props.onChange(newReward);
    };
    const buttonText = selectedObjectiveReward ? selectedObjectiveReward.objectiveKey : '(No selection)';
    return (
      <FormGroup label="Objective">
        <ObjectiveSelect filterable={false} items={objectives} itemRenderer={renderSelectObjective} onItemSelect={selectObjective}>
          <Button text={buttonText} rightIcon="double-caret-vertical" />
        </ObjectiveSelect>
        <Switch disabled={!selectedObjectiveReward} label="Add / Remove" onChange={onTypeChange} />
        <Button disabled={!selectedObjectiveReward} onClick={addNewObjective}> Add objective reward </Button>
      </FormGroup>
    );
  };

  return (
    <>
      {stringProperties.length && renderPropertyReward()}
      <Divider />
      {numericProperties.length && renderAttributeReward()}
      <Divider />
      {objectives.length ? renderObjectiveReward() : null}
      <ReactJson src={reward} theme="hopscotch" enableClipboard={false} />
    </>
  );

};

export default RewardInput;
