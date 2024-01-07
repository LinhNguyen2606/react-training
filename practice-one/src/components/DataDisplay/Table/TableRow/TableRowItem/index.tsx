type TableRowItemProps<T> = {
  children: JSX.Element[];
  index: number;
  rowData: T;
  isSelected: boolean;
  onClick: (index: number, rowData: T) => void;
};

const TableRowItem = <T,>({ children, index, rowData, isSelected, onClick }: TableRowItemProps<T>) => {
  /**
 * Handles the click event on a table row item.
 * Calls the `onClick` function with the index and data of the clicked row item.
 */
  const handleClick = () => onClick(index, rowData);
  return (
    <tr className={isSelected ? 'table__row  table__row--active ' : 'table__row'} onClick={handleClick}>
      {children}
    </tr>
  );
};

export default TableRowItem;
