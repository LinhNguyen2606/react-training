// Interface
import { EnitityColumn } from '@interfaces';

// Components
import TableHeader from '@components/Table/TableHeader';
import TableRow from '@components/Table/TableRow';

// SCSS
import '@components/Table/Table.scss';

type TableProps<T> = {
  rowData: T[];
  columns: EnitityColumn<T>[];
  onRowClick: (index: number, item: T) => void;
  selectedRow: { index: number; data: T | null };
};

const Table = <T,>({
  rowData,
  columns,
  onRowClick,
  selectedRow
}: TableProps<T>) => {
  return (
    <table className="table">
        <thead className="table__head">
          <TableHeader columns={columns} />
        </thead>

        <tbody>
          <TableRow
            rowData={rowData}
            columns={columns}
            onRowClick={onRowClick}
            selectedRow={selectedRow}
          />
        </tbody>
    </table>
  );
};

export default Table;
