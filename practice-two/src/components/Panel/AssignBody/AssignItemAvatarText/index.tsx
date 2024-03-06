// Component
import { Avatar } from '@components';

// Interface
import { Item } from '@interfaces';

interface AssignItemAvatarTextProps extends Item{
  src: string;
  bgColor: string;
  isModifying: boolean;
  isAssigning: boolean;
  handleItemSelect: (id: string) => () => void;
}

const AssignItemAvatarText = ({
  id,
  src,
  name,
  bgColor,
  isModifying,
  isAssigning,
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
          className={`panel-assign--input ${isAssigning ? "disabled" : ""}`}
          disabled={isAssigning}
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
