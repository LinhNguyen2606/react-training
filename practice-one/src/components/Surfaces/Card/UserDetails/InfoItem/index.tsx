import { InfoItemType } from '../../../../../types';
import Icon from '../../../../DataDisplay/Icon';

const InfoItem = ({
  icon,
  label,
  value
}: InfoItemType) => {
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
