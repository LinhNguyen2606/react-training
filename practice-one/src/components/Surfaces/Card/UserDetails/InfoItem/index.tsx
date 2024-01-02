// Component
import { Icon } from "@components/DataDisplay";

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
      <div className="user--icon">
        <Icon src={icon} />
        <span className="primary__text">{label}</span>
      </div>
      <span className="user__text primary__text">{value}</span>
    </>
  );
};

export default InfoItem;
