import IDocumentBase from '@type/DocumentBase';

export interface IStatistic extends IDocumentBase {
  name: string;
}

export interface IAttribute extends IStatistic {
  min: number;
  max: number;
}

export interface IProperty extends IStatistic {
  values: string[];
}

export interface IObjective extends IStatistic {

}

export enum ObjectiveValue {
  FAIL, SUCCESS,
}
