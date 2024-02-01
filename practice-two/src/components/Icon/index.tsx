type IconProps = {
  src: string;
  size?: string;
  onClick?: () => void;
};

const Icon = ({
  src,
  size = '16',
  onClick
}: IconProps) => {
  return (
    <figure>
          <img
            src={src}
            width={size}
            alt="The icon"
            height={size} 
            onClick={onClick}
          />
    </figure>
  )
};

export default Icon;
