interface TableRowItemProps<T> {
  rowData: T;
  index: number;
  isSelected: boolean;
  children: JSX.Element[];
  onClick: (index: number, rowData: T) => void;
};

const TableRowItem = <T,>({
  rowData,
  index,
  isSelected,
  children,
  onClick
}: TableRowItemProps<T>) => {
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
