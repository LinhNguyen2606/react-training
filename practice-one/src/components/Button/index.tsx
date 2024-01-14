import {
  ButtonHTMLAttributes,
  FC,
  ReactElement,
  ReactNode
} from 'react';

// SCSS
import '@components/Button/Button.scss';

type ButtonSize = 'lg' | 'md' | 'sm';

export type CustomBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  additionalClass?: string;
  children: ReactNode;
  size?: ButtonSize;
  variants?: 'primary' | 'secondary';
  onClick?: () => void;
};

const Button: FC<CustomBtnProps> = ({
  additionalClass,
  children,
  size,
  variants = 'primary',
  onClick,
}): ReactElement => {
  return (
    <button className={`btn btn--${variants} btn--size-${size} btn__${additionalClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
