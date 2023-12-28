type IconProps = {
  src: string;
  width?: string;
  height?: string;
};

const Icon = ({
  src,
  width = '16px',
  height = '16px'
}: IconProps) => {
  return <img
    src={src}
    width={width}
    height={height} 
  />;
};

export default Icon;
