import {
  memo,
  useContext,
  useState
} from 'react';
import { mutate } from 'swr';

// Component
import AssignItem from '@components/Panel/AssignItems';

// Interface
import { Item } from '@interfaces';

// Context
import { Context } from '@stores';

// Services
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
  findUserItemId,
  getCorrespondingUserItems,
  isItemAssignedToUser,
  transformListViewInfo,
  transformUserInfo,
} from '@helpers';

// Constant
import { API } from '@constants';

interface AssignRulesProps {
  rules: Item[];
  heading: string;
}

const AssignRules = ({ rules, heading }: AssignRulesProps) => {
  const [ruleState, setRuleState] = useState<Item[]>(rules);

  const {
    setIsShowProgress,
    selectedRow,
    setDataItems
  } = useContext(Context);

  const { data: ruleData } = getRules();
  const { data: roleData } = getRoles();
  const { data: userRules } = getUserRules();
  const { data: userRoles } = getUserRoles();

  const isRuleAssignedToUser = (userId: string, ruleId: string) =>
    isItemAssignedToUser(userId, ruleId, userRules || [], 'ruleId');

  const findUserRuleId = (userId: string, ruleId: string) =>
    findUserItemId(userId, ruleId, userRules || []);

  const getCorrespondingUserRules = getCorrespondingUserItems(
    userRules,
    ruleData,
    selectedRow.data.id
  );
  const getCorrespondingUserRoles = getCorrespondingUserItems(
    userRoles,
    roleData,
    selectedRow.data.id
  );

  /**
   * Handles the selection of an rule.
   * @param id - The ID of the rule.
   */
  const handleRuleAction = (id: string) => async () => {
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
      items={rules}
      heading={heading}
      optionName="rule"
      handleItemSelect={handleRuleAction}
    />
  );
};

export default memo(AssignRules);
