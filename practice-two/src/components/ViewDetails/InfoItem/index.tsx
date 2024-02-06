// Component
import { Icons } from '@components';
import { ReactNode } from 'react';

export interface InfoItemProps {
  icon: string;
  label: string;
  value: ReactNode;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
  return (
    <>
      <div className="view-details--icon">
        <Icons src={icon} />
        <span className="text--primary">{label}</span>
      </div>
      {value}
    </>
  );
};

export default InfoItem;
