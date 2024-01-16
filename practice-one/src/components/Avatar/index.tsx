// SCSS
import '@components/Avatar/Avatar.scss';

type AvatarSize = 'lg' | 'md' | 'sm';

type AvatarProps = {
  src?: string;
  alt: string;
  bgColor?: string;
  additionalClass?: string;
  size?: AvatarSize
};

const Avatar = ({
  src,
  alt,
  bgColor,
  additionalClass,
  size = 'sm'
}: AvatarProps) => {
  const initial = alt?.charAt(0).toUpperCase();

  return (
    <div className={`avatar ${additionalClass}`} style={{ backgroundColor: bgColor }}>
      {src ? (
        <img className={`avatar__img ${additionalClass}`} src={src} alt={alt} />
      ) : (
        <span className={`avatar__initial avatar--${size}`}>{initial}</span>
      )}
    </div>
  );
};

export default Avatar;
