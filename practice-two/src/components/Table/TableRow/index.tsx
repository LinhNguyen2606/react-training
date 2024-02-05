// Interface
import { EnitityColumn } from '@interfaces';

// Components
import TableRowItem from '@components/Table/TableRow/TableRowItem';
import TableRowCell from '@components/Table/TableRow/TableRowCell';

type TableRowProps<T> = {
  rowData: T[];
  columns: EnitityColumn<T>[];
  onRowClick: (index: number, item: T) => void;
  selectedRow: { index: number; data: T | null };
};

const TableRow = <T,>({
  rowData,
  columns,
  onRowClick,
  selectedRow
}: TableRowProps<T>) => {

  /**
   * Handles the event when a row in the table is clicked.
   * Calls the `onRowClick` function with the index and data of the clicked row.
   *
   * @param {number} index - The index of the clicked row.
   * @param {T} rowData - The data of the clicked row.
   */
  const handleRowClick = (index: number, rowData: T) => onRowClick(index, rowData);

  return (
    <>
      {rowData?.map((item, index) => (
        <TableRowItem
          key={`table-row-${index}`}
          rowData={item}
          index={index}
          isSelected={selectedRow?.index === index}
          onClick={handleRowClick}
        >
          {columns.map((column, index) => (
            <TableRowCell
              key={`table-row-cell-${index}`}
              item={item}
              column={column}
            />
          ))}
        </TableRowItem>
      ))}
    </>
  );
};

export default TableRow;
