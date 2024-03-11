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
import { assignRuleToRole, unAssignRuleFromRole } from '@services';

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

interface AssignRoleRulesProps {
  heading?: string;
  items: Item[];
  ruleData?: Rule[];
  roles?: Role[];
  roleRules?: RoleRule[];
  userRoles?: UserRole[];
}

const AssignRoleRules = ({
  heading,
  items,
  ruleData,
  roles,
  roleRules,
  userRoles,
}: AssignRoleRulesProps) => {
  // State and Context
  const [rules, setRules] = useState<Item[]>(items);
  const [isAssigning, setIsAssigning] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { selectedRow } = state;

  // Handles the data
  const getCorrespondingRoleRules = getCorrespondingRoleItems(
    roleRules || [],
    ruleData || [],
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
      roleRules || [],
      'ruleId'
    );

    // Find the roleRuleId
    const roleRuleId = findRoleIdFromAssigned(
      selectedRow.data.id,
      id,
      roleRules || [],
      'ruleId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromRole(roleRuleId)
      : () => assignRuleToRole(selectedRow.data.id, id);

    // Perform the action and retrieve the response
    const res = await action();
    const data = extractData(res);

    if (!data) {
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.ROLE_RULES}`);

    // Create a new array with the updated assigned state for the selected rule
    const newRules = rules.map((rule) => {
      if (rule.id === id) {
        return { ...rule, isAssigned: !isCurrentlyAssigned };
      }
      return rule;
    });

    // Update the state of the list rul
    setRules(newRules);

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
      singleOption={SingleOptionTypes.RoleRulesAssigned}
      optionName="roleRules"
      handleItemSelect={handleAssignAction}
      isAssigning={isAssigning}
    />
  );
};

export default AssignRoleRules;
