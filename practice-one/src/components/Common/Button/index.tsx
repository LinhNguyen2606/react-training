import { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from 'react';

// Types
import { Variant } from '../../../types';

// SCSS
import './Button.scss';

type TButtonSize = 'lg' | 'md';

export type CustomBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: ReactNode;
  size?: TButtonSize;
  variants?: Variant;
};

const Button: FC<CustomBtnProps> = ({ className, children, size, variants = 'primary' }): ReactElement => {
  return <button className={`btn btn--${variants} btn--size-${size} btn__${className}`}>{children}</button>;
};

export default Button;
