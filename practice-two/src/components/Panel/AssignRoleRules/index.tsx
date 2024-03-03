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
  assignRuleToRole,
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
  unAssignRuleFromRole,
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

interface AssignRoleRulesProps {
  heading: string;
  items: Item[];
}

const AssignRoleRules = ({ heading, items }: AssignRoleRulesProps) => {
  // State and Context
  const [rules, setRules] = useState<Item[]>(items);
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
      setIsShowProgress('failure');
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
      singleOption={SingleOptionTypes.RoleRulesAssigned}
      optionName="roleRules"
      handleItemSelect={handleAssignAction}
    />
  );
};

export default AssignRoleRules;
