// Component
import { Avatar } from '@components';

// Interface
import { Item } from '@interfaces';

interface AssignItemAvatarTextProps extends Item{
  src: string;
  bgColor: string;
  isModifying: boolean;
  handleItemSelect: (id: string) => () => void;
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
          onChange={handleItemSelect(id!)}
          className="panel-assign--input"
        />
      )}
      {isModifying || isAssigned ? (
        <>
          <Avatar
            src={src}
            alt={name!}
            size="x-sm"
            bgColor={bgColor}
          />
          <span className="panel-assign__avatar-text--name">{name}</span>
        </>
      ) : null}
    </div>
  );
};

export default AssignItemAvatarText;
