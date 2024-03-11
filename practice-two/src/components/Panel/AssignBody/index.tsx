// Components
import { AssignmentOptions } from '@components/Panel/AssignItems';
import AssignItemAvatarText from '@components/Panel/AssignBody/AssignItemAvatarText';
import AssignItemTextTags from '@components/Panel/AssignBody/AssignItemTextTags';

// Interfaces
import { Item, Role } from '@interfaces';

interface AssignBodyProps {
  items: Item[];
  roles: Role[];
  isModifying: boolean;
  isAssigning: boolean;
  selectedType: AssignmentOptions;
  handleItemSelect: (id: string) => () => void;
}

const AssignBody = ({
  items,
  roles,
  isModifying,
  isAssigning,
  selectedType,
  handleItemSelect,
}: AssignBodyProps) => {
  const style =
    selectedType === AssignmentOptions.AssignedDirectly ? '#f4f5f9' : '#fff';

  return (
    <ul style={{ backgroundColor: style }}>
      {items.map(
        (item) =>
          (isModifying || item.isAssigned) && (
            <li key={item.id} className="panel-assign__item">
              {item.avatar || item.bgColor ? (
                <AssignItemAvatarText
                  id={item.id!}
                  name={item.name! || item.userName!}
                  bgColor={item.bgColor!}
                  isAssigning={isAssigning}
                  isModifying={isModifying}
                  isAssigned={item.isAssigned!}
                  handleItemSelect={handleItemSelect}
                  src={item.avatar!}
                />
              ) : (
                <AssignItemTextTags
                  id={item.id!}
                  roles={roles}
                  name={item.name!}
                  description={item.description}
                  isAssigning={isAssigning}
                  isRoleAssigned={item.isRoleAssigned!}
                  isAssigned={item.isAssigned!}
                  isModifying={isModifying}
                  assignedTo={item.assignedTo}
                  selectedType={selectedType}
                  handleItemSelect={handleItemSelect}
                />
              )}
            </li>
          )
      )}
    </ul>
  );
};

export default AssignBody;
