import { IImage } from '@type/image';
import { IRequirement } from '@type/Requirement';
import { IReward } from './Reward';

export interface IEvent {
  name: string;
  scenes: ISceneBase[];
  requirement: IRequirement;
}

export interface IEventDto {
  name: string;
  scenes: ISceneBase[];
  requirement: IRequirement;
}

export interface IOption {
  text: string;
  next?: number;
  requirement?: IRequirement;
}

export type SceneType = 'DEFAULT' | 'OPTION' | 'REWARD';

export interface IScene extends ISceneImage {
  next: number;
  image?: IImage;
}

export interface ISceneOption extends ISceneImage {
  image?: IImage;
  options?: IOption[];
}

export interface ISceneImage extends ISceneBase {
  text: string;
  image?: IImage;
}

export interface ISceneReward extends ISceneBase {
  next: number;
  reward: IReward;
}

export interface ISceneBase {
  type?: SceneType;
}

export interface IImageToSceneMap {
  imageIndex: number;
  sceneIndex: number;
}

