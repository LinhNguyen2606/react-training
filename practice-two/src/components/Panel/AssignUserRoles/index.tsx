import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Components
import AssignItem from '@components/Panel/AssignItems';
import { SingleOptionTypes } from '@components/Panel/AssignHeader';

// Interfaces
import {
  Item,
  Role,
  Rule,
  UserRole,
  UserRule
} from '@interfaces';

// Context
import { Context } from '@stores';

// Services
import { assignRoleToUser, unAssignRoleFromUser } from '@services';

// Helpers
import {
  extractData,
  findUserIdFromAssigned,
  getCorrespondingUserItems,
  isItemAssignedToUser,
  transformListViewInfo,
  transformUserInfo,
} from '@helpers';

// Constant
import { API, TYPES } from '@constants';

interface AssignRolesProps {
  roles: Item[];
  rules?: Rule[];
  heading?: string;
  roleData?: Role[];
  userRules?: UserRule[];
  userRoles?: UserRole[];
}

const AssignUserRoles = ({
  roles,
  rules,
  heading,
  roleData,
  userRules,
  userRoles,
}: AssignRolesProps) => {
  // State and Context
  const [roleState, setRoleState] = useState<Item[]>(roles);
  const [isAssigning, setIsAssigning] = useState(false);

  const { dispatch, state } = useContext(Context);
  const { selectedRow } = state;

  // Handles the data
  const getCorrespondingUserRules = getCorrespondingUserItems(
    userRules || [],
    rules || [],
    selectedRow.data.id
  );

  const getCorrespondingUserRoles = getCorrespondingUserItems(
    userRoles || [],
    roleData || [],
    selectedRow.data.id
  );

  /**
   * Handles the selection of role.
   * @param id - The ID of the role.
   */
  const handleRoleAction = (id: string) => async () => {
    dispatch({ type: TYPES.PROCESSING });
    setIsAssigning(true);

    // Check if the current rule is already assigned to the user
    const isCurrentlyAssigned = isItemAssignedToUser(
      selectedRow.data.id,
      id,
      userRoles || [],
      'roleId'
    );

    // Find the userRoleId
    const userRoleId = findUserIdFromAssigned(
      selectedRow.data.id,
      id,
      userRoles || [],
      'roleId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRoleFromUser(userRoleId)
      : () => assignRoleToUser(selectedRow.data.id, id);

    // Perform the action and retrieve the response
    const res = await action();
    const data = extractData(res);

    if (!data) {
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.USER_ROLES}`);

    // Create a new array with the updated assigned state for the selected role
    const newRoles = roleState.map((role) => {
      if (role.id === id) {
        return { ...role, isAssigned: !isCurrentlyAssigned };
      }
      return role;
    });

    // Update the state of the list rule
    setRoleState(newRoles);

    // Update the display data list
    dispatch({
      type: TYPES.DATA_ITEMS,
      payload: [
        ...transformListViewInfo(
          getCorrespondingUserRules,
          getCorrespondingUserRoles
        ),
        ...transformUserInfo(selectedRow.data),
      ],
    });

    dispatch({ type: TYPES.SUCCESS });
    
    setIsAssigning(false);
  };

  return (
    <AssignItem
      items={roles}
      heading={heading!}
      singleOption={SingleOptionTypes.RolesAssigned}
      optionName="role"
      handleItemSelect={handleRoleAction}
      isAssigning={isAssigning}
    />
  );
};

export default AssignUserRoles;
