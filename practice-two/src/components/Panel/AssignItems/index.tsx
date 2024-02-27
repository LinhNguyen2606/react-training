import {
  ChangeEvent,
  useContext,
  
  useMemo, useState
} from 'react';
import { mutate } from 'swr';

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
  Rule
} from '@interfaces';

// Service
import {
  assignRuleToUser,
  getRoles,
  getRules,
  getUserRoles,
  getUserRules,
  unAssignRuleFromUser,
} from '@services';

// Helpers
import {
  extractData,
  transformListViewInfo,
  transformUserInfo
} from '@helpers';

// Store
import { Context } from '@stores';

// Constant
import { API } from '@constants';

export enum AssignmentOptions {
  AssignedDirectly = 'Assigned directly',
  AllAssignments = 'All assignments',
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

  const { setIsShowProgress, selectedRow, setDataItems } = useContext(Context);

  const { data: ruleData } = getRules();
  const { data: roleData } = getRoles();
  const { data: userRules } = getUserRules();
  const { data: userRoles } = getUserRoles();

  const getCorrespondingUserRules = userRules
    ?.filter((userRule) => userRule.userId === selectedRow.data.id)
    .map((userRule) => ruleData?.find((rule) => rule.id === userRule.ruleId));

  const getCorrespondingUserRoles = userRoles
    ?.filter((userRole) => userRole.userId === selectedRow.data.id)
    .map((userRole) => roleData?.find((role) => role.id === userRole.roleId));

  const isRuleAssignedToUser = (userId: string, ruleId: string) =>
    userRules?.some((rule) => rule.userId === userId && rule.ruleId === ruleId);

  const findUserRuleId = (userId: string, ruleId: string) => {
    const userRule = userRules?.find(
      (rule) => rule.userId === userId && rule.ruleId === ruleId
    );
    return userRule ? userRule.id : null;
  };

  /**
   * Handles the ,change of assignment type.
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
  const handleItemSelect = (id: string) => async () => {
    setIsShowProgress('processing');

    // Check if the current rule is already assigned to the user
    const isCurrentlyAssigned = isRuleAssignedToUser(selectedRow.data.id, id);

    // Find the userRuleId
    const userRuleId = findUserRuleId(selectedRow.data.id, id);

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromUser(userRuleId)
      : () => assignRuleToUser(selectedRow.data.id, id);

    // Perform the action and retrieve the response
    const res = await action();
    const data = extractData(res);

    if (!data) {
      setIsShowProgress('failure');
      return;
    }

    // Create a new array with the updated assigned state for the selected item
    const newItems = itemState.map((item) => {
      if (item.id === id) {
        return { ...item, isAssigned: !isCurrentlyAssigned };
      }
      return item;
    });
    // Update the state of the item list
    setItemState(newItems);

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.USER_RULES}`, newItems, false);

    // Update the display data list
    setDataItems([
      ...transformListViewInfo(
        (getCorrespondingUserRules ?? []).filter(
          (rule): rule is Rule => rule !== undefined
        ),
        (getCorrespondingUserRoles ?? []).filter(
          (role): role is Role => role !== undefined
        )
      ),
      ...transformUserInfo(selectedRow.data),
    ]);

    setIsShowProgress('success');
  };

  /**
   * Filters the items based on the search term.
   */
  const filteredItems = useMemo(() => {
    return itemState.filter((item) =>
      item.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [itemState, debouncedSearchTerm]);

  return (
    <section className="panel-assign">
      <AssignHeader
        items={itemState}
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
