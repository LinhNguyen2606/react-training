type TableCellProps = {
  children: JSX.Element | string;
};

const TableCell = ({ children }: TableCellProps) => {
  return <td className="table__row--cell">{children}</td>;
};

export default TableCell;
