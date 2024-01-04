// Interface
import { EnitityColumn } from '@interfaces';

// Component
import TableHeaderCell from '@components/DataDisplay/Table/TableHeader/TableHeaderCell';

type TableHeaderProps<T> = {
  columns: EnitityColumn<T>[];
};

const TableHeader = <T,>({ columns }: TableHeaderProps<T>): JSX.Element => {
  return (
    <tr className="table__header">
      {columns?.map((column, index) => (
        <TableHeaderCell key={`table-header-cell-${index}`}>{column.title}</TableHeaderCell>
      ))}
    </tr>
  );
};

export default TableHeader;
