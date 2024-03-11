import {
  ChangeEvent,
  useMemo,
  useState
} from 'react';

// Components
import AssignHeader, {
  SingleOptionTypes,
} from '@components/Panel/AssignHeader';
import AssignBody from '@components/Panel/AssignBody';

// Custom hook
import { useDebounce } from '@hooks';

// Interfaces
import {
  Item,
  Role,
  RoleRule,
  UserRole,
  UserRule
} from '@interfaces';

export enum AssignmentOptions {
  AssignedDirectly = 'Assigned directly',
  AllAssignments = 'All assignments',
}

interface AssignItemsProps {
  src?: string;
  items: Item[];
  heading: string;
  optionName: string;
  isAssigning: boolean;
  roles?: Role[];
  userRules?: UserRule[];
  userRoles?: UserRole[];
  roleRules?: RoleRule[];
  singleOption?: SingleOptionTypes;
  handleItemSelect: (id: string) => () => void;
}

const AssignItem = ({
  items,
  heading,
  optionName,
  isAssigning,
  roles,
  userRules,
  userRoles,
  roleRules,
  singleOption,
  handleItemSelect,
}: AssignItemsProps) => {
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
   * Filters the items based on the search term.
   */
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      (item.name || item.userName)?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [items, debouncedSearchTerm]);

  return (
    <section className="panel-assign">
      <AssignHeader
        items={items}
        heading={heading}
        isModifying={isModifying}
        userRules={userRules}
        userRoles={userRoles}
        roleRules={roleRules}
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
        items={filteredItems}
        isModifying={isModifying}
        selectedType={selectedType}
        handleItemSelect={handleItemSelect}
        isAssigning={isAssigning}
        roles={roles!}
      />
    </section>
  );
};

export default AssignItem;
