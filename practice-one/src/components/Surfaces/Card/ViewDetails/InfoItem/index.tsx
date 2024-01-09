// Component
import { Icon } from '@components/DataDisplay';

export type InfoItemProps = {
  icon: string;
  label?: string;
  value?: string;
};

const InfoItem = ({
  icon,
  label,
  value
}: InfoItemProps) => {
  return (
    <>
      <div className="view-details--icon">
        <Icon src={icon} />
        <span className="text--primary">{label}</span>
      </div>
      <span className="view-details__text">{value}</span>
    </>
  );
};

export default InfoItem;
