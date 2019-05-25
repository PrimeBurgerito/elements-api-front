export interface IElementsTableProps {
  columns: IColumnModel[];
  data: object[];
  onSelect?: (object: object) => void;
}

export interface IColumnModel {
  name: string;
  key: string;
}
