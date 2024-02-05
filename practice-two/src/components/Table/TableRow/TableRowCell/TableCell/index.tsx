interface TableCellProps {
  style?: React.CSSProperties;
  children: JSX.Element | string;
};

const TableCell = ({ children, style }: TableCellProps) => {
  return (
    <td className="table__row--cell" style={style}>
      {children}
    </td>
  );
};

export default TableCell;
