import { ReactNode } from 'react';

// SCSS
import '@components/Button/Button.scss';

type ButtonSize = 'lg' | 'md' | 'sm';

type ButtonProps = {
  size: ButtonSize;
  children: ReactNode;
  onClick: () => void;
  additionalClass?: string;
  variants: 'primary' | 'secondary';
};

const Button = ({
  onClick,
  children,
  size = 'lg',
  additionalClass = '',
  variants = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variants} btn--size-${size} ${additionalClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
