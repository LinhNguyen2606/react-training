// Icon
import { Pencil } from '@assets/icons';

// Type
import { InfoItemType } from '@types';

// Components
import { Avatar, Icon, Status } from '@components/DataDisplay';
import InfoItem from './InfoItem';

// SCSS
import './UserDetails.scss';

type UserDetailsProps = {
  title?: string;
  isActive?: boolean;
  src?: string;
  bgColor?: string;
  userName: string;
  infoItem: InfoItemType[];
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
    <div className="user__wrapper">
      <div className="user">
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
        <span className="user__username primary__text">{userName}</span>
        <div>
          {infoItem.map(({ icon, label, value }, index) => (
            <InfoItem
              key={index}
              icon={icon}
              label={label ? label : 'Unknown'}
              value={value ? value : 'Unknown'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
