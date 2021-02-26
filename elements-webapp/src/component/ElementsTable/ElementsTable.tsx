import { Cell, Column, IRegion, JSONFormat, SelectionModes, Table } from '@blueprintjs/table';
import { IColumnModel, IElementsTableProps } from '@component/ElementsTable/ElementsTableResource';
import React from 'react';
import { view } from 'react-easy-state';

const ElementsTable: React.FC<IElementsTableProps> = (props) => {

  const renderCell = (cellIndex: number, columnIndex: number): React.ReactElement => {
    const paramKey = props.columns[columnIndex].key;
    const cellData = props.data[cellIndex]?.[paramKey];
    return <Cell key={`cell-${cellIndex}-${columnIndex}-${paramKey}`}>
      {typeof cellData === 'object' ? <JSONFormat>{cellData}</JSONFormat> : cellData}
    </Cell>;
  };

  const renderColumn = (column: IColumnModel): React.ReactElement => {
    return <Column key={`column-${column.key}`} name={column.name} cellRenderer={renderCell} />;
  };

  const tableSelection = (selection: IRegion[]) => {
    if (props.onSelect && selection.length && 'rows' in selection[0]) {
      const entityIdx = selection[0].rows[0];
      props.onSelect(props.data[entityIdx]);
    } else {
      props.onSelect(null);
    }
  };

  return (
    <Table
      enableMultipleSelection={false}
      selectionModes={SelectionModes.ROWS_AND_CELLS}
      enableRowResizing={false}
      numRows={props.data.length}
      onSelection={tableSelection}
    >
      {props.columns.map(renderColumn)}
    </Table>
  );
};

export default view(ElementsTable);
