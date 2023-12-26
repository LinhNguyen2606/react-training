// Types
import { EnitityColumnType } from '../../../types';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

// SCSS
import './Table.scss';

type TableProps<T> = {
  rowData: T[];
  columns: EnitityColumnType<T>[];
  className?: string;
  onRowClick: (index: number, item: T) => void;
};

const Table = <T,>({ rowData, columns, className, onRowClick }: TableProps<T>) => {
  return (
    <div className="table__wrapper">
      <table className={`table ${className}`}>
        <thead className="table__head">
          <TableHeader columns={columns} />
        </thead>

        <tbody className="table__body">
          <TableRow rowData={rowData} columns={columns} onRowClick={onRowClick} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
