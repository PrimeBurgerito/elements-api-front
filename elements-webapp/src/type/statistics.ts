import DocumentBase from '@type/DocumentBase';

export interface IStatistic extends DocumentBase {
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
