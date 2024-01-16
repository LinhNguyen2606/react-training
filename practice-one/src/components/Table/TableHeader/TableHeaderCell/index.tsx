type TableHeaderCellProps = {
  children?: string;
};

const TableHeaderCell = ({ children }: TableHeaderCellProps) => {
  return <th className="table__header--cell">{children}</th>;
};

export default TableHeaderCell;
