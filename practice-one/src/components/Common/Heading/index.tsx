import { FC, ReactElement } from 'react';
import './heading.scss';

export type HeadingProps = {
  className?: string;
  children: React.ReactNode;
};

const Heading: FC<HeadingProps> = ({ className, children }): ReactElement => {
  return <h1 className={className}>{children}</h1>;
};

export default Heading;
