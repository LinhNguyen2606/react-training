// Type
import { EnitityColumnType } from '../../../../../types';

// Component
import TableCell from './TableCell';

type TableRowCellProps<T> = {
  item: T;
  column: EnitityColumnType<T>;
};

const TableRowCell = <T,>({ item, column }: TableRowCellProps<T>): JSX.Element => {
  // Fetch the value of the property specified by column.key from the item
  const value = item[column.key as keyof T];

  return <TableCell>{column.render ? column.render(column, item) : (value as unknown as string)}</TableCell>;
};

export default TableRowCell;
