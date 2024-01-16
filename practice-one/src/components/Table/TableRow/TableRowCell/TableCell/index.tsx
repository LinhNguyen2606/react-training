type TableCellProps = {
  children: JSX.Element | string;
  style?: React.CSSProperties;
};

const TableCell = ({ children, style }: TableCellProps) => {
  return (
    <td className="table__row--cell" style={style}>
      {children}
    </td>
  );
};

export default TableCell;
