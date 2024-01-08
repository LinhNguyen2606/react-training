// Interface
import { EnitityColumn } from '@interfaces';

// Components
import TableHeader from '@components/DataDisplay/Table/TableHeader';
import TableRow from '@components/DataDisplay/Table/TableRow';

// SCSS
import './Table.scss';

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
    <div className="table">
      <table className="table__wrapper">
        <thead className="table__head">
          <TableHeader columns={columns} />
        </thead>

        <tbody className="table__body">
          <TableRow
            rowData={rowData}
            columns={columns}
            onRowClick={onRowClick}
            selectedRow={selectedRow}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
