import { useLocation } from 'react-router-dom';

// Component
import { Avatar } from '@components';

// Constant
import { PATH } from '@constants';

interface AvatarLabelViewProps {
  src: string;
  alt: string;
  desc?: string;
  label?: string;
  bgColor?: string;
}

const AvatarLabelView = ({
  src,
  alt,
  desc,
  label,
  bgColor,
}: AvatarLabelViewProps) => {
  const location = useLocation();

  const showAvatar =
    location.pathname === PATH.HOME_PATH ||
    location.pathname === PATH.ROLES_PATH;
  
  const showRuleDesc = location.pathname === PATH.RULES_PATH;

  return (
    <>
      {showAvatar&& (
        <Avatar
          size="lg"
          src={src}
          alt={alt}
          bgColor={bgColor}
        />
      )}
      <label className="sidebar__label-name">{label}</label>
      {showRuleDesc && <p className="text--primary sidebar__rule-description">{desc}</p>}
    </>
  );
};

export default AvatarLabelView;
