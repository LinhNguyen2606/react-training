import {
  memo,
  useContext,
  useState
} from 'react';
import { mutate } from 'swr';

// Components
import AssignItem from '@components/Panel/AssignItems';
import { SingleOptionTypes } from '@components/Panel/AssignHeader';

// Interfaces
import { Item } from '@interfaces';

// Context
import { Context } from '@stores';

// Services
import {
  assignRoleToUser,
  getRoles,
  getRules,
  getUserRoles,
  getUserRules,
  unAssignRoleFromUser,
} from '@services';

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
import { API } from '@constants';

interface AssignRolesProps {
  roles: Item[];
  heading: string;
}

const AssignRoles = ({ roles, heading }: AssignRolesProps) => {
  const [roleState, setRoleState] = useState<Item[]>(roles);

  const { setIsShowProgress, selectedRow, setDataItems } = useContext(Context);

  const { data: ruleData } = getRules();
  const { data: roleData } = getRoles();
  const { data: userRules } = getUserRules();
  const { data: userRoles } = getUserRoles();

  const getCorrespondingUserRules = getCorrespondingUserItems(
    userRules || [],
    ruleData || [],
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
    setIsShowProgress('processing');

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
      setIsShowProgress('failure');
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
    setDataItems([
      ...transformListViewInfo(
        getCorrespondingUserRules,
        getCorrespondingUserRoles
      ),
      ...transformUserInfo(selectedRow.data),
    ]);

    setIsShowProgress('success');
  };

  return (
    <AssignItem
      items={roles}
      heading={heading}
      singleOption={SingleOptionTypes.RolesAssigned}
      optionName="role"
      handleItemSelect={handleRoleAction}
    />
  );
};

export default memo(AssignRoles);
