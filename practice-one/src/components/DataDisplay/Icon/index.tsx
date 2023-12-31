type IconProps = {
  src: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

const Icon = ({
  src,
  width = '16px',
  height = '16px',
  onClick
}: IconProps) => {
  return(
    <img
      src={src}
      width={width}
      height={height} 
      onClick={onClick}
      />
  )
};

export default Icon;
