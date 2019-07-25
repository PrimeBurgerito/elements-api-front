export type RewardType = 'ADD' | 'REMOVE';

export interface IPropertyReward {
  propertyId: string;
  value: string;
  type: RewardType;
}

export interface IAttributeReward {
  attributeId: string;
  value: number;
}

export interface IObjectiveReward {
  objectiveId: string;
  type: RewardType;
}

export interface IReward {
  properties: IPropertyReward[];
  attributes: IAttributeReward[];
  objectives: IObjectiveReward[];
}
