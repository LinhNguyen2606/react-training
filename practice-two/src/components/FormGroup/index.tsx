import { ReactNode } from 'react';

// SCSS
import '@components/FormGroup/FormGroup.scss';

// Interface
import { DataItems } from '@interfaces';

interface FormGroupProps {
  item: DataItems;
  children: ReactNode;
}

const FormGroup = ({ item, children }: FormGroupProps) => {
  return (
    <div className="form-group">
      <label className="form-group--label">{item.label}</label>
      {children}
    </div>
  );
};

export default FormGroup;
