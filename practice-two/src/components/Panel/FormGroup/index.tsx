import { ReactNode } from 'react';

// Interface
import { DataItems } from '@interfaces';

interface FormGroupProps {
  item: DataItems;
  children: ReactNode;
}

const FormGroup = ({ item, children }: FormGroupProps) => {
  return (
    <div className="panel__form-group">
      <label className="panel__form-group--label">{item.label}</label>
      {children}
    </div>
  );
};

export default FormGroup;
