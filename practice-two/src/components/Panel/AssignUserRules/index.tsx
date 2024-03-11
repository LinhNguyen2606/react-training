import { useContext, useState } from 'react';
import { mutate } from 'swr';

// Component
import AssignItem from '@components/Panel/AssignItems';

// Interfaces
import {
  Item,
  Role,
  RoleRule,
  Rule,
  UserRole,
  UserRule
} from '@interfaces';

// Context
import { Context } from '@stores';

// Services
import { assignRuleToUser, unAssignRuleFromUser } from '@services';

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

interface AssignRulesProps {
  rules: Item[];
  roles?: Role[];
  heading?: string;
  ruleData?: Rule[];
  userRules?: UserRule[];
  userRoles?: UserRole[];
  roleRules?: RoleRule[];
}

const AssignUserRules = ({
  rules,
  roles,
  heading,
  ruleData,
  userRules,
  userRoles,
  roleRules
}: AssignRulesProps) => {
  // State and Context
  const [ruleState, setRuleState] = useState<Item[]>(rules);
  const [isAssigning, setIsAssigning] = useState(false);

  const { dispatch, state } = useContext(Context);
  const { selectedRow } = state;

  // Handles the data from API
  const getCorrespondingUserRules = getCorrespondingUserItems(
    userRules || [],
    ruleData || [],
    selectedRow.data.id
  );
  const getCorrespondingUserRoles = getCorrespondingUserItems(
    userRoles || [],
    roles || [],
    selectedRow.data.id
  );

  /**
   * Handles the selection of an rule.
   * @param id - The ID of the rule.
   */
  const handleRuleAction = (id: string) => async () => {
    dispatch({ type: TYPES.PROCESSING });
    setIsAssigning(true);

    // Check if the current rule is already assigned to the user
    const isCurrentlyAssigned = isItemAssignedToUser(
      selectedRow.data.id,
      id,
      userRules || [],
      'ruleId'
    );

    // Find the userRuleId
    const userRuleId = findUserIdFromAssigned(
      selectedRow.data.id,
      id,
      userRules || [],
      'ruleId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromUser(userRuleId)
      : () => assignRuleToUser(selectedRow.data.id, id);

    // Perform the action and retrieve the response
    const res = await action();
    const data = extractData(res);

    if (!data) {
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.USER_RULES}`);

    // Create a new array with the updated assigned state for the selected rule
    const newRules = ruleState.map((rule) => {
      if (rule.id === id) {
        return { ...rule, isAssigned: !isCurrentlyAssigned };
      }
      return rule;
    });

    // Update the state of the item list
    setRuleState(newRules);

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
      items={rules}
      heading={heading!}
      optionName="rule"
      handleItemSelect={handleRuleAction}
      isAssigning={isAssigning}
      roles={roles}
      userRules={userRules}
      userRoles={userRoles}
      roleRules={roleRules}
    />
  );
};

export default AssignUserRules;
