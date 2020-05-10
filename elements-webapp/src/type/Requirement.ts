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

export interface IPropertiesRequirement {
  stringProperties: { [key: string]: Set<string> };
  numericProperties: { [key: string]: { first: number, second: number } };
}

export interface IRequirement {
  locationIds?: string[];
  timing?: ITiming;
  objectives?: string[];
  properties?: IPropertiesRequirement;
}
