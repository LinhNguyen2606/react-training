import { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from 'react';

// Types
import { Variant } from '../../../types';
import { ButtonSize } from '../../../types';

// SCSS
import './Button.scss';

export type CustomBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  additionalClass?: string;
  children: ReactNode;
  size?: ButtonSize;
  variants?: Variant;
};

const Button: FC<CustomBtnProps> = ({
  additionalClass,
  children,
  size,
  variants = 'primary'
}): ReactElement => {
  return <button className={`btn btn--${variants} btn--size-${size} btn__${additionalClass}`}>{children}</button>;
};

export default Button;
