import '@components/Avatar/Avatar.scss';

type AvatarSize = 'lg' | 'md' | 'sm';

type AvatarProps = {
  src: string;
  alt: string;
  size: AvatarSize;
  bgColor?: string;
};

const Avatar = ({
  src,
  alt,
  bgColor,
  size = 'sm'
}: AvatarProps) => {
  const initial = alt?.charAt(0).toUpperCase();
  const circleClass = size === 'sm' ? 'avatar--circle' : '';
  
  return (
    <div
      className={`avatar avatar--${size} ${circleClass}`}
      style={{ backgroundColor: bgColor }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`full-width full-height ${circleClass}`}
        />
      ) : (
        <span className={`avatar__initial avatar__text--${size}`}>{initial}</span>
      )}
    </div>
  );
};

export default Avatar;
