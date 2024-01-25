import { DataItems } from '@interfaces';
import { ReactNode } from 'react';

type FormGroupProps = {
  item: DataItems;
  children: ReactNode;
};

const FormGroup = ({ item, children }: FormGroupProps) => {
  return (
    <div className="panel__form-group">
      <label className="panel__form-group--label">{item.label}</label>
      {children}
    </div>
  );
};

export default FormGroup;
