type IconProps = {
  src?: string;
  width?: string;
  height?: string;
};

const Icon = ({
  src,
  width = '20px',
  height = '20px'
}: IconProps) => {
  return <img src={src} style={{ width: width, height: height }} />;
};

export default Icon;
