import { IRequirement } from '@type/requirement';

export interface IEvent {
  scenes: IScene[];
  requirement: IRequirement;
}

export interface ISceneOption {
  text: string;
  next?: number;
  requirement?: IRequirement;
}

export type SceneType = 'DEFAULT' | 'OPTION';

export interface IScene {
  text: string;
  next?: number;
  type?: SceneType;
  options?: ISceneOption[];
}

