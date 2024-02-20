// Interface
import { EnitityColumn } from '@interfaces';

// Components
import TableHeader from '@components/Table/TableHeader';
import TableRow from '@components/Table/TableRow';
import { Spin } from '@components';

// SCSS
import '@components/Table/Table.scss';

type TableProps<T> = {
  rowData: T[];
  loading: boolean;
  columns: EnitityColumn<T>[];
  onRowClick: (index: number, item: T) => void;
  selectedRow: { index: number; data: T | null };
};

const Table = <T,>({
  rowData,
  loading,
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
        {loading ? (
          <tr>
            <td colSpan={columns.length}>
              <Spin
                isProcessing={true}
                size={40}
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
