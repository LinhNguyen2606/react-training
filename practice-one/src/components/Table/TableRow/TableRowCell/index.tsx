// Interface
import { EnitityColumn } from '@interfaces';

// Component
import TableCell from '@components/Table/TableRow/TableRowCell/TableCell';

type TableRowCellProps<T> = {
  item: T;
  column: EnitityColumn<T>;
};

const TableRowCell = <T,>({ item, column }: TableRowCellProps<T>): JSX.Element => {
  // Fetch the value of the property specified by column.key from the item
  const value = item[column.key as keyof T];

  return (
    <TableCell style={{ minWidth: column.width }}>
      {column.render ? column.render(column, item) : (value as unknown as string)}
    </TableCell>
  );
};

export default TableRowCell;
