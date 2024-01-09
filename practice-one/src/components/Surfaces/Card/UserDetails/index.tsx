// Icon
import { Pencil } from '@assets/icons';

// Type
import { InfoItemProps } from '@components/Surfaces/Card/UserDetails/InfoItem';

// Components
import { Avatar, Icon, Status } from '@components/DataDisplay';
import InfoItem from '@components/Surfaces/Card/UserDetails/InfoItem';

// SCSS
import '@components/Surfaces/Card/UserDetails/UserDetails.scss';

type UserDetailsProps = {
  title?: string;
  isActive?: boolean;
  src?: string;
  bgColor?: string;
  userName: string;
  infoItem: InfoItemProps[];
};

const UserDetails = ({
  title,
  isActive,
  src,
  bgColor,
  userName,
  infoItem
}: UserDetailsProps) => {
  return (
    <div className="user">
      <div className="user__wrapper">
        <article className="user__header">
          <h2 className="primary__text">{title}</h2>
          <Status isActive={isActive} />
          <div className="user__header--icon">
            <Icon src={Pencil} />
          </div>
        </article>
        <Avatar
          src={src}
          alt={userName}
          bgColor={bgColor}
          additionalClass="user__avatar"
        />
        <span className="user__username">{userName}</span>
        <div>
          {infoItem.map(({ icon, label, value }, index) => (
            <InfoItem
              key={index}
              icon={icon}
              label={label}
              value={value ? value : 'Unknown'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
