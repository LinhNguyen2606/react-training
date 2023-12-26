// SCSS
import './Avatar.scss';

type AvatarProps = {
  src?: string;
  alt: string;
  bgColor?: string;
  className?: string;
};

const Avatar = ({ src, alt, bgColor, className }: AvatarProps) => {
  const initial = alt.charAt(0).toUpperCase();
  return (
    <div className={`avatar ${className}`} style={{ backgroundColor: bgColor }}>
      {src ? (
        <img className={`avatar__img ${className}`} src={src} alt={alt} />
      ) : (
        <span className={`avatar__initial`}>{initial}</span>
      )}
    </div>
  );
};

export default Avatar;
