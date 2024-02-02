import { ReactNode } from 'react';

// SCSS
import '@components/Button/Button.scss';

// Component
import { Icons } from '@components';

type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps {
  endIcon?: string;
  size: ButtonSize;
  startIcon?: string;
  onClick?: () => void;
  children: ReactNode;
  additionalClass?: string;
  variants: 'primary' | 'secondary';
};

const Button = ({
  endIcon,
  onClick,
  children,
  startIcon,
  size = 'lg',
  additionalClass = '',
  variants = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variants} btn--size-${size} ${additionalClass}`}
      onClick={onClick}
    >
      {startIcon && <Icons src={startIcon} />}
      {children}
      {endIcon && <Icons src={endIcon} />}
    </button>
  );
};

export default Button;
