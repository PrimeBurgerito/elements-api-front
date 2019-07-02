import { IRequirement } from '@type/requirement';

export interface IEvent {
  scenes: IScene[];
  requirement: IRequirement;
}

interface ISceneOption {
  text: string;
  next: number;
  requirement: IRequirement;
}

export type SceneType = 'DEFAULT' | 'OPTION';

export interface IScene {
  next: number;
  test: string;
  type: SceneType;
  options: ISceneOption[];
}

