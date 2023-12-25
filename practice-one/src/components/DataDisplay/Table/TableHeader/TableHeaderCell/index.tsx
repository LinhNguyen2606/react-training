import './TableHeaderCell.scss';

type TableHeaderCellProps = {
  children?: string;
};

const TableHeaderCell = ({ children }: TableHeaderCellProps) => {
  return <li className="table__header--info primary__text">{children}</li>;
};

export default TableHeaderCell;
