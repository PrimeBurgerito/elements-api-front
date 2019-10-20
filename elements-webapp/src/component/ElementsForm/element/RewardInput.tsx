import { Button, Divider, FormGroup, MenuItem, NumericInput, Switch } from '@blueprintjs/core';
import { IItemRendererProps, ItemRenderer, Select } from '@blueprintjs/select';
import AttributeApi from '@shared/api/statistic/AttributeApi';
import ObjectiveApi from '@shared/api/statistic/ObjectiveApi';
import PropertyApi from '@shared/api/statistic/PropertyApi';
import { IAttributeReward, IObjectiveReward, IPropertyReward, IReward } from '@type/reward';
import { IAttribute, IObjective, IProperty, IStatistic } from '@type/statistics';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

type RewardInputProps = {
  id?: string;
  rewardValue?: IReward;
  onChange: (properties: IReward) => void;
};

const RewardInput = (props: RewardInputProps): ReactElement<any> => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<IPropertyReward>(null);
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState<IAttributeReward>(null);
  const [objectives, setObjectives] = useState<IObjective[]>([]);
  const [selectedObjective, setSelectedObjective] = useState<IObjectiveReward>(null);
  const [reward, setReward] = useState<IReward>({attributes: [], objectives: [], properties: []});

  const PropertySelect = Select.ofType<IProperty>();
  const AttributeSelect = Select.ofType<IAttribute>();
  const ObjectiveSelect = Select.ofType<IObjective>();
  const StringSelect = Select.ofType<string>();

  useEffect(() => {
    Promise.all([
      new AttributeApi().find(true),
      new PropertyApi().find(true),
      new ObjectiveApi().find(true)
    ]).then(([attributesResponse, propertiesResponse, objectivesResponse]) => {
      setAttributes(attributesResponse);
      setProperties(propertiesResponse);
      setObjectives(objectivesResponse);
    });
  }, []);

  useEffect(() => {
    if (props.rewardValue) {
      setReward(props.rewardValue);
    }
  }, [props.rewardValue]);

  const renderSelectItem = <T extends IStatistic>(): ItemRenderer<T> => (item: T, itemProps: IItemRendererProps) => {
    return <MenuItem active={itemProps.modifiers.active} key={item.key} text={item.name} onClick={itemProps.handleClick} />;
  };

  const renderPropertyReward = (): ReactElement<any> => {
    const renderStringItem: ItemRenderer<string> = (item: string, itemProps: IItemRendererProps) => {
      return <MenuItem active={itemProps.modifiers.active} key={item} text={item} onClick={itemProps.handleClick} />;
    };
    const setSelectedPropertyReward = (property: IProperty) => setSelectedProperty({
      propertyKey: property.key,
      value: property.values[0],
      type: 'ADD'
    });
    const onTypeChange = ({target}) => setSelectedProperty({...selectedProperty, type: target['checked'] ? 'ADD' : 'REMOVE'});
    const addNewProperty = () => {
      const newReward = {...reward, properties: [...reward.properties, selectedProperty]};
      setReward(newReward);
      props.onChange(newReward);
    };
    return (
      <FormGroup label="Property">
        <PropertySelect items={properties} itemRenderer={renderSelectItem<IProperty>()} onItemSelect={setSelectedPropertyReward}
                        noResults={<MenuItem disabled={true} text="No results." />} filterable={false}>
          <Button text={selectedProperty ? selectedProperty.value : '(No selection)'} rightIcon="double-caret-vertical" />
        </PropertySelect>
        <Switch disabled={!selectedProperty} label="Add / Remove" onChange={onTypeChange} />
        <StringSelect
          disabled={!selectedProperty}
          items={selectedProperty ? properties.find((p) => p.key === selectedProperty.propertyKey).values : []}
          itemRenderer={renderStringItem}
          onItemSelect={(item: string) => setSelectedProperty({...selectedProperty, value: item})}
        />
        <Button disabled={!selectedProperty} onClick={addNewProperty}> Add property reward </Button>
      </FormGroup>
    );
  };

  const renderAttributeReward = (): ReactElement<any> => {
    const selectAttribute = (attribute: IAttribute) => setSelectedAttribute({attributeKey: attribute.key, value: 0});
    const valueChange = (value: number) => setSelectedAttribute({...selectedAttribute, value});
    const addNewAttribute = () => {
      const newReward = {...reward, attributes: [...reward.attributes, selectedAttribute]};
      setReward(newReward);
      props.onChange(newReward);
    };
    return (
      <FormGroup label="Attribute">
        <AttributeSelect filterable={false} items={attributes} itemRenderer={renderSelectItem<IAttribute>()} onItemSelect={selectAttribute}>
          <Button text={selectedAttribute ? selectedAttribute.attributeKey : '(No selection)'} rightIcon="double-caret-vertical" />
        </AttributeSelect>
        <NumericInput disabled={!selectedAttribute} value={selectedAttribute ? selectedAttribute.value : 0} onValueChange={valueChange} />
        <Button disabled={!selectedAttribute} onClick={addNewAttribute}>Add attribute reward</Button>
      </FormGroup>
    );
  };

  const renderObjectiveReward = (): ReactElement<any> => {
    const selectObjective = (objective: IObjective) => setSelectedObjective({objectiveKey: objective.key, type: 'ADD'});
    const onTypeChange = ({target}) => setSelectedObjective({...selectedObjective, type: target['checked'] ? 'ADD' : 'REMOVE'});
    const addNewObjective = () => {
      const newReward = {...reward, objectives: [...reward.objectives, selectedObjective]};
      setReward(newReward);
      props.onChange(newReward);
    };
    return (
      <FormGroup label="Objective">
        <ObjectiveSelect filterable={false} items={objectives} itemRenderer={renderSelectItem<IObjective>()} onItemSelect={selectObjective}>
          <Button text={selectedObjective ? selectedObjective.objectiveKey : '(No selection)'} rightIcon="double-caret-vertical" />
        </ObjectiveSelect>
        <Switch disabled={!selectedObjective} label="Add / Remove" onChange={onTypeChange} />
        <Button disabled={!selectedObjective} onClick={addNewObjective}> Add objective reward </Button>
      </FormGroup>
    );
  };

  return (
    <>
      {properties.length && renderPropertyReward()}
      <Divider />
      {attributes.length && renderAttributeReward()}
      <Divider />
      {objectives.length ? renderObjectiveReward() : null}
      <ReactJson src={reward} theme="hopscotch" enableClipboard={false} />
    </>
  );

};

export default RewardInput;
