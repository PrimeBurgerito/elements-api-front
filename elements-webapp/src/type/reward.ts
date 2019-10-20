export type RewardType = 'ADD' | 'REMOVE';

export interface IPropertyReward {
  propertyKey: string;
  value: string;
  type: RewardType;
}

export interface IAttributeReward {
  attributeKey: string;
  value: number;
}

export interface IObjectiveReward {
  objectiveKey: string;
  type: RewardType;
}

export interface IReward {
  properties: IPropertyReward[];
  attributes: IAttributeReward[];
  objectives: IObjectiveReward[];
}
