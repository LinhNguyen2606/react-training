import { ReactNode } from 'react';

// SCSS
import '@components/Button/Button.scss';

// Component
import { Icons } from '@components';

type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps {
  endIcon?: string;
  size: ButtonSize;
  disabled?: boolean;
  startIcon?: string;
  children: ReactNode;
  onClick?: () => void;
  additionalClass?: string;
  variants: 'primary' | 'secondary';
}

const Button = ({
  endIcon,
  size = 'lg',
  disabled,
  startIcon,
  children,
  onClick,
  additionalClass = '',
  variants = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variants} btn--size-${size} ${additionalClass} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <Icons src={startIcon} />}
      {children}
      {endIcon && <Icons src={endIcon} />}
    </button>
  );
};

export default Button;
