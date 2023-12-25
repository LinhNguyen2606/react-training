// Type
import { EnitityColumnType } from '../../../../types';

// Component
import TableHeaderCell from './TableHeaderCell';

type TableHeaderProps<T> = {
  columns: EnitityColumnType<T>[];
};

const TableHeader = <T,>({ columns }: TableHeaderProps<T>): JSX.Element => {
  return (
    <ul className="table__header">
      {columns.map((column, index) => (
        <TableHeaderCell key={`table-header-cell-${index}`}>{column.title}</TableHeaderCell>
      ))}
    </ul>
  );
};

export default TableHeader;
