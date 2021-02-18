export interface ITiming {
  weekdays?: number[];
  monthDays?: number[];
  months?: string[];
  time?: ITimeRange[];
}

export interface ITimeRange {
  start: Date | string;
  end: Date | string;
}

export type IRequirementStringProperties = { [key: string]: string[] };
export type IRequirementNumericProperties = { [key: string]: { first: number, second: number } };

export interface IPropertiesRequirement {
  stringProperties: IRequirementStringProperties;
  numericProperties: IRequirementNumericProperties;
}

export interface IRequirement {
  locationIds?: string[];
  timing?: ITiming;
  objectives?: string[];
  properties?: IPropertiesRequirement;
}

export const defaultRequirement = (): IRequirement => ({
  locationIds: [],
  objectives: [],
  timing: null,
  properties: {
    stringProperties: null,
    numericProperties: null,
  },
});
