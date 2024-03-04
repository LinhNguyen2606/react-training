import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Interface
import { Item } from '@interfaces';

// Components
import AssignItem from '@components/Panel/AssignItems';
import { SingleOptionTypes } from '@components/Panel/AssignHeader';

// Context
import { Context } from '@stores';

// Services
import {
  assignUserToRole,
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
  unAssignUserFromRole,
} from '@services';

// Helpers
import {
  extractData,
  findRoleIdFromAssigned,
  getCorrespondingRoleItems,
  getCorrespondingUserItems,
  isItemAssignedToRole,
  transformListViewRoleInfo,
  transformRoleInfo,
} from '@helpers';

// Constant
import { API } from '@constants';

interface AssignRoleMembersProps {
  items: Item[];
  heading: string;
}

const AssignRoleMembers = ({ items, heading }: AssignRoleMembersProps) => {
  // State and Context
  const [users, setUsers] = useState<Item[]>(items);
  const { setIsShowProgress, selectedRow, setDataItems } = useContext(Context);

  // Get the data from API
  const { data: ruleData } = getRules();
  const { data: roleData } = getRoles();
  const { data: roleRules } = getRoleRules();
  const { data: userRoles } = getUserRoles();

  // Handles the data
  const getCorrespondingRoleRules = getCorrespondingRoleItems(
    roleRules || [],
    ruleData || [],
    selectedRow.data?.id
  );

  const getCorrespondingUserRoles = getCorrespondingUserItems(
    userRoles || [],
    roleData || [],
    selectedRow.data?.id
  );

  /**
   * Handles the selection of roleRule.
   * @param id - The ID of the roleRule.
   */
  const handleAssignAction = (id: string) => async () => {
    setIsShowProgress('processing');

    // Check if the current rule is already assigned to the role
    const isCurrentlyAssigned = isItemAssignedToRole(
      selectedRow.data.id,
      id,
      userRoles || [],
      'userId'
    );

    // Find the userRoleId
    const userRoleId = findRoleIdFromAssigned(
      selectedRow.data.id,
      id,
      userRoles || [],
      'userId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignUserFromRole(userRoleId)
      : () => assignUserToRole(id, selectedRow.data.id);

    // Perform the action and retrieve the response
    const res = await action();
    const data = extractData(res);

    if (!data) {
      setIsShowProgress('failure');
      return;
    }

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.USER_ROLES}`);

    // Create a new array with the updated assigned state for the selected rule
    const newUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, isAssigned: !isCurrentlyAssigned };
      }
      return user;
    });

    // Update the state of the list rul
    setUsers(newUsers);

    // Update the dispaly dataList
    setDataItems([
      ...transformListViewRoleInfo(
        getCorrespondingRoleRules,
        getCorrespondingUserRoles
      ),
      ...transformRoleInfo(selectedRow.data),
    ]);

    setIsShowProgress('success');
  };

  return (
    <AssignItem
      items={items}
      heading={heading}
      singleOption={SingleOptionTypes.MemberAssigned}
      optionName="roleMembers"
      handleItemSelect={handleAssignAction}
    />
  );
};

export default AssignRoleMembers;
