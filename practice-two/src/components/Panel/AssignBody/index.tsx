// Components
import { AssignmentOptions } from '@components/Panel/AssignItems';
import AssignItemAvatarText from '@components/Panel/AssignBody/AssignItemAvatarText';
import AssignItemTextTags from '@components/Panel/AssignBody/AssignItemTextTags';

// Interface
import { Item } from '@interfaces';

interface AssignBodyProps {
  src?: string;
  items: Item[];
  isModifying: boolean;
  selectedType: AssignmentOptions;
  handleItemSelect: (id: string) => () => void;
}

const AssignBody = ({
  src,
  items,
  isModifying,
  selectedType,
  handleItemSelect,
}: AssignBodyProps) => {
  const style =
    selectedType === AssignmentOptions.AssignedDirectly ? '#f4f5f9' : '#fff';

  return (
    <ul style={{ backgroundColor: style }}>
      {items.map((item) => (
        <li key={item.id} className="panel-assign__item">
          {src || item.bgColor ? (
            <AssignItemAvatarText
              id={item.id}
              name={item.name}
              bgColor={item.bgColor}
              isModifying={isModifying}
              isAssigned={item.isAssigned}
              handleItemSelect={handleItemSelect}
              src={src}
            />
          ) : (
            <AssignItemTextTags
              id={item.id}
              name={item.name}
              description={item.description}
              isAssigned={item.isAssigned}
              isModifying={isModifying}
              assignedTo={item.assignedTo}
              selectedType={selectedType}
              handleItemSelect={handleItemSelect}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default AssignBody;
