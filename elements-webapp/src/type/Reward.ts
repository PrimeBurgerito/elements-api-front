export type RewardType = 'ADD' | 'REMOVE';

export interface IPropertyReward<T> {
  propertyKey: string;
  value: T;
  type: RewardType;
}

export interface IStringPropertyReward extends IPropertyReward<string[]> {
}


export interface INumericPropertyReward extends IPropertyReward<number> {
}

export interface IObjectiveReward {
  objectiveKey: string;
  type: RewardType;
}

export interface IReward {
  stringProperties: IStringPropertyReward[];
  numericProperties: INumericPropertyReward[];
  objectives: IObjectiveReward[];
}
