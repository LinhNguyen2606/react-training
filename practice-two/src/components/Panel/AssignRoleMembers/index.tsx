import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Interfaces
import {
  Item,
  Role,
  RoleRule,
  Rule,
  UserRole
} from '@interfaces';

// Components
import AssignItem from '@components/Panel/AssignItems';
import { SingleOptionTypes } from '@components/Panel/AssignHeader';

// Context
import { Context } from '@stores';

// Services
import {
  assignUserToRole,
  unAssignUserFromRole
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
import { API, TYPES } from '@constants';

interface AssignRoleMembersProps {
  items: Item[];
  rules?: Rule[];
  roles?: Role[];
  heading?: string;
  roleRules?: RoleRule[];
  userRoles?: UserRole[];
}

const AssignRoleMembers = ({
  items,
  rules,
  roles,
  heading,
  roleRules,
  userRoles,
}: AssignRoleMembersProps) => {
  // State and Context
  const [users, setUsers] = useState<Item[]>(items);
  const [isAssigning, setIsAssigning] = useState(false);

  const { dispatch, state } = useContext(Context);
  const { selectedRow } = state;

  // Handles the data
  const getCorrespondingRoleRules = getCorrespondingRoleItems(
    roleRules || [],
    rules || [],
    selectedRow.data?.id
  );

  const getCorrespondingUserRoles = getCorrespondingUserItems(
    userRoles || [],
    roles || [],
    selectedRow.data?.id
  );

  /**
   * Handles the selection of roleRule.
   * @param id - The ID of the roleRule.
   */
  const handleAssignAction = (id: string) => async () => {
    dispatch({ type: TYPES.PROCESSING });
    setIsAssigning(true);

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
      dispatch({ type: TYPES.FAILURE });
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
    dispatch({
      type: TYPES.DATA_ITEMS,
      payload: [
        ...transformListViewRoleInfo(
          getCorrespondingRoleRules,
          getCorrespondingUserRoles
        ),
        ...transformRoleInfo(selectedRow.data),
      ],
    });

    dispatch({ type: TYPES.SUCCESS });
    setIsAssigning(false);
  };

  return (
    <AssignItem
      items={items}
      heading={heading!}
      singleOption={SingleOptionTypes.MemberAssigned}
      optionName="roleMembers"
      handleItemSelect={handleAssignAction}
      isAssigning={isAssigning}
    />
  );
};

export default AssignRoleMembers;
