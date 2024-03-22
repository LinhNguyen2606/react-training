// Interface
import { EnitityColumn } from '@interfaces';

// Components
import TableHeader from '@components/Table/TableHeader';
import TableRow from '@components/Table/TableRow';
import { Spin } from '@components';

// SCSS
import '@components/Table/Table.scss';

interface TableProps<T> {
  rowData: T[];
  isLoading?: boolean;
  columns: EnitityColumn<T>[];
  onRowClick: (index: number, item: T) => void;
  selectedRow: { index: number; data: T | null };
};

const Table = <T,>({
  rowData,
  isLoading,
  columns,
  onRowClick,
  selectedRow,
}: TableProps<T>) => {
  return (
    <table className="table">
      <thead className="table__head">
        <TableHeader columns={columns} />
      </thead>

      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length}>
              <Spin
                isProcessing={isLoading}
                delay={3000}
                size={30}
                style={{ justifyContent: 'center', margin: '40px 0' }}
              />
            </td>
          </tr>
        ) : (
          <TableRow
            rowData={rowData}
            columns={columns}
            onRowClick={onRowClick}
            selectedRow={selectedRow}
          />
        )}
      </tbody>
    </table>
  );
};

export default Table;
