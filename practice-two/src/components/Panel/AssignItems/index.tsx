import { ChangeEvent, useMemo, useState } from 'react';

// Components
import AssignHeader, {
  SingleOptionTypes,
} from '@components/Panel/AssignHeader';
import AssignBody from '@components/Panel/AssignBody';

// Custom hook
import { useDebounce } from '@hooks';

export enum AssignmentOptions {
  AssignedDirectly = 'Assigned directly',
  AllAssignments = 'All assignments',
}

export interface Item {
  id: number;
  name: string;
  bgColor?: string;
  description?: string;
  isAssigned: boolean;
  isAssignedDirectly?: boolean;
  assignedTo: [
    {
      id: number;
      name: string;
    }
  ];
}

interface AssignItemsProps {
  src?: string;
  items: Item[];
  heading: string;
  optionName: string;
  singleOption?: SingleOptionTypes;
}

const AssignItem = ({
  src,
  items,
  heading,
  optionName,
  singleOption,
}: AssignItemsProps) => {
  const [itemState, setItemState] = useState<Item[]>(items);
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<AssignmentOptions>(
    AssignmentOptions.AssignedDirectly
  );
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /**
   * Handles the change of assignment type.
   * @param event - The change event.
   */
  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value as AssignmentOptions);
    setIsModifying(false);
  };

  /**
   * Handles the click event for the modify button.
   */
  const handleModifyClick = () => setIsModifying(!isModifying);

  /**
   * Handles the change event for the search input.
   * @param event - The change event.
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  /**
   * Handles the selection of an item.
   * @param id - The ID of the item.
   */
  const handleItemSelect =
    (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const itemsClone = [...itemState];
      const index = itemsClone.findIndex((item) => item.id === id);

      if (index >= 0) {
        itemsClone[index].isAssigned = event.target.checked;
      }

      setItemState(itemsClone);
    };

  /**
   * Filters the items based on the search term.
   */
  const filteredItems = useMemo(() => {
    return items.filter((item: Item) =>
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [items, debouncedSearchTerm]);

  return (
    <section className="panel-assign">
      <AssignHeader
        items={items}
        heading={heading}
        isModifying={isModifying}
        onModifyClick={handleModifyClick}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        singleOption={singleOption}
        optionName={optionName}
      />

      <div className="panel-assign__search">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search"
          onChange={handleSearchChange}
          className="panel-assign__search-input"
        />
      </div>

      <AssignBody
        src={src}
        items={filteredItems}
        isModifying={isModifying}
        selectedType={selectedType}
        handleItemSelect={handleItemSelect}
      />
    </section>
  );
};

export default AssignItem;
