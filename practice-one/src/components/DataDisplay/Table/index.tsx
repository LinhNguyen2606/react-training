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
  additionalClass?: string;
  onRowClick: (index: number, item: T) => void;
  selectedRow: { index: number; data: T | null };
};

const Table = <T,>({
  rowData,
  columns,
  additionalClass,
  onRowClick,
  selectedRow
}: TableProps<T>) => {
  return (
    <div className="table__wrapper">
      <table className={`table ${additionalClass}`}>
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
