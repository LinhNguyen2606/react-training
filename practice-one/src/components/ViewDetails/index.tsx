// Icon
import { Pencil } from '@assets/icons';

// Type
import { InfoItemProps } from '@components/ViewDetails/InfoItem';

// Components
import { Avatar, Icon, Status } from '@components';
import InfoItem from '@components/ViewDetails/InfoItem';

// SCSS
import '@components/ViewDetails/ViewDetails.scss';

type ViewDetailsProps = {
  title?: string;
  isActive?: boolean;
  src?: string;
  bgColor?: string;
  userName: string;
  infoItem: InfoItemProps[];
  onShowPanel: () => void;
};

const ViewDetails = ({
  title,
  isActive,
  src,
  bgColor,
  userName,
  infoItem,
  onShowPanel
}: ViewDetailsProps) => {
  return (
    <div className="view-details">
        <article className="view-details__header">
          <h2 className="text--primary">{title}</h2>
          <Status isActive={isActive} />
          <div className="view-details__header--icon">
            <Icon src={Pencil} onClick={onShowPanel} />
          </div>
        </article>
        <Avatar
          size='lg'
          src={src}
          alt={userName}
          bgColor={bgColor}
          additionalClass="view-details__avatar"
        />
        <span className="view-details__username">{userName}</span>
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
  );
};

export default ViewDetails;
