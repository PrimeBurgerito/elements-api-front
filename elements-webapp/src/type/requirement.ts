import { ObjectiveValue } from '@type/statistics';

export interface ITiming {
  weekdays: number[];
  monthDays: number[];
  months: string[];
  time: string[];
}

export interface IRequirement {
  locationId: string;
  timing: ITiming;
  objectives: { [name: string]: ObjectiveValue };
  properties: { [name: string]: string[] };
  attributes: { [name: string]: number[] };
}
