type TableRowItemProps<T> = {
  children: JSX.Element[];
  index: number;
  rowData: T;
  isSelected: boolean;
  onClick: (index: number, rowData: T) => void;
};

const TableRowItem = <T,>({ children, index, rowData, isSelected, onClick }: TableRowItemProps<T>) => {
  const handleClick = () => {
    onClick(index, rowData);
  };

  return (
    <tr className={isSelected ? 'table__row  table__row--active ' : 'table__row'} onClick={handleClick}>
      {children}
    </tr>
  );
};

export default TableRowItem;
