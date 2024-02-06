// Type
import { InfoItemProps } from '@components/ViewDetails/InfoItem';

// Component
import InfoItem from '@components/ViewDetails/InfoItem';

// SCSS
import '@components/ViewDetails/ViewDetails.scss';

interface ViewDetailsProps {
  title: string;
  header: React.ReactNode;
  children: React.ReactNode;
  infoItem: InfoItemProps[];
}

const ViewDetails = ({
  title,
  header,
  children,
  infoItem,
}: ViewDetailsProps) => {
  return (
    <div className="view-details">
      <article className="view-details__header">
        <h2 className="text--primary">{title}</h2>
        {header}
      </article>
      {children}
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
