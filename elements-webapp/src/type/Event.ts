import { IImage } from '@type/image';
import { IRequirement } from '@type/Requirement';
import { IReward } from './Reward';
import { IRealmDocument, IRealmDocumentDto } from '@type/Realm';

export interface IEvent extends IRealmDocument {
  name: string;
  scenes: ISceneBase[];
  requirement: IRequirement;
}

export interface IEventDto extends IRealmDocumentDto {
  name: string;
  scenes: ISceneBase[];
  requirement: IRequirement;
}

export interface IOption {
  text: string;
  next?: number;
  requirement?: IRequirement;
}

export enum SceneType {
  DEFAULT = 'DEFAULT',
  OPTION = 'OPTION',
  REWARD = 'REWARD',
}

export interface ISceneBase<T extends SceneType = SceneType> {
  type: T;
}

export interface ISceneImage<T extends SceneType> extends ISceneBase<T> {
  text: string;
  image?: IImage;
}

export interface IScene extends ISceneImage<SceneType.DEFAULT> {
  next: number;
  image?: IImage;
  type: SceneType.DEFAULT;
}

export interface ISceneOption extends ISceneImage<SceneType.OPTION> {
  image?: IImage;
  options?: IOption[];
  type: SceneType.OPTION;
}

export interface ISceneReward extends ISceneBase<SceneType.REWARD> {
  next: number;
  reward: IReward;
  type: SceneType.REWARD;
}

export interface IImageToSceneMap {
  imageIndex: number;
  sceneIndex: number;
}
