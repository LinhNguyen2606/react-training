interface IconsProps {
  src: string;
  alt?: string;
  size?: string;
  onClick?: () => void;
};

const Icons = ({
  src,
  alt,
  size = '16',
  onClick
}: IconsProps) => {
  return (
    <figure>
      <img
        className="icon"
        src={src}
        width={size}
        alt={alt}
        height={size}
        onClick={onClick}
      />
    </figure>
  );
};

export default Icons;
