import { IRealmDocument } from '@type/Realm';

export interface IElementsTableProps {
  columns: IColumnModel[];
  data: ReadonlyArray<IRealmDocument>;
  onSelect?: (object: IRealmDocument) => void;
}

export interface IColumnModel {
  name: string;
  key: string;
}
