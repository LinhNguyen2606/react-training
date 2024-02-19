import { ChangeEvent } from 'react';

// Component
import { Avatar } from '@components';

interface AssignItemAvatarTextProps {
  id: number;
  src?: string;
  name: string;
  bgColor?: string;
  isModifying: boolean;
  isAssigned: boolean;
  handleItemSelect: (
    id: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const AssignItemAvatarText = ({
  id,
  src,
  name,
  bgColor,
  isModifying,
  isAssigned,
  handleItemSelect,
}: AssignItemAvatarTextProps) => {
  return (
    <div className="panel-assign__avatar-text">
      {isModifying && (
        <input
          type="checkbox"
          checked={isAssigned}
          onChange={handleItemSelect(id)}
          className="panel-assign--input"
        />
      )}
      <Avatar
        src={src}
        alt={name}
        size="x-sm"
        bgColor={bgColor}
      />
      <span className="panel-assign__avatar-text--name">{name}</span>
    </div>
  );
};

export default AssignItemAvatarText;
