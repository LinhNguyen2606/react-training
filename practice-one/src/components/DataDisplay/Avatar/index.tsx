// SCSS
import '@components/DataDisplay/Avatar/Avatar.scss';

type AvatarProps = {
  src?: string;
  alt: string;
  bgColor?: string;
  additionalClass?: string;
};

const Avatar = ({
  src,
  alt,
  bgColor,
  additionalClass
}: AvatarProps) => {
  const initial = alt.charAt(0).toUpperCase();
  return (
    <div className={`avatar ${additionalClass}`} style={{ backgroundColor: bgColor }}>
      {src ? (
        <img className={`avatar__img ${additionalClass}`} src={src} alt={alt} />
      ) : (
        <span className={`avatar__initial`}>{initial}</span>
      )}
    </div>
  );
};

export default Avatar;
