// Types
import { useState } from 'react';
import { EnitityColumnType } from '../../../../types';

// Components
import TableRowCell from './TableRowCell';
import TableRowItem from './TableRowItem';

type TableRowProps<T> = {
  rowData: T[];
  columns: EnitityColumnType<T>[];
  onRowClick: (index: number, item: T) => void;
};

const TableRow = <T,>({ rowData, columns, onRowClick }: TableRowProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const handleRowClick = (index: number, rowData: T) => {
    if (selectedRow === index) {
      setSelectedRow(undefined);
    } else {
      setSelectedRow(index);
    }
    onRowClick(index, rowData);
  };

  return (
    <>
      {rowData.map((item, index) => (
        <TableRowItem
          key={`table-row-${index}`}
          rowData={item}
          index={index}
          isSelected={selectedRow === index}
          onClick={handleRowClick}
        >
          {columns.map((column, index) => (
            <TableRowCell key={`table-row-cell-${index}`} item={item} column={column} />
          ))}
        </TableRowItem>
      ))}
    </>
  );
};

export default TableRow;
