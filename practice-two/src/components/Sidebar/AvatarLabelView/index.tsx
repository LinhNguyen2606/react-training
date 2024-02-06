// Component
import { Avatar } from '@components';
import { AvatarSize } from '@components/Avatar';

interface AvatarLabelViewProps {
  src: string;
  alt: string;
  desc: string;
  label: string;
  bgColor: string;
  size: AvatarSize;
}

const AvatarLabelView = ({
  src,
  alt,
  desc,
  label,
  bgColor,
  size = 'lg',
}: AvatarLabelViewProps) => {
  return (
    <>
      <Avatar
        size={size}
        src={src}
        alt={alt}
        bgColor={bgColor}
      />
      <label className="sidebar__label-name">{label}</label>
      {!src && !alt && (
        <p className="text--primary sidebar__rule-description">{desc}</p>
      )}
    </>
  );
};

export default AvatarLabelView;
