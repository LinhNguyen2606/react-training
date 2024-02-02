type IconsProps = {
  src: string;
  size?: string;
  onClick?: () => void;
};

const Icons = ({
  src,
  size = '16',
  onClick
}: IconsProps) => {
  return (
    <figure>
      <img
        className="icon"
        src={src}
        width={size}
        alt="The icon"
        height={size}
        onClick={onClick}
      />
    </figure>
  );
};

export default Icons;
