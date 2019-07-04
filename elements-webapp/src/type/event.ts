import { IImage } from '@type/image';
import { IRequirement } from '@type/requirement';

export interface IEvent {
  scenes: IScene[];
  requirement: IRequirement;
}

export interface IEventDto {
  scenes: ISceneDto[];
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
  image?: IImage;
  type?: SceneType;
  options?: ISceneOption[];
}

export interface ISceneDto {
  text: string;
  next?: number;
  type?: SceneType;
  options?: ISceneOption[];
}

export interface IImageToSceneMap {
  imageIndex: number;
  sceneIndex: number;
}

