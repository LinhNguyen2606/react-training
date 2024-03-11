import { ChangeEvent, useContext } from 'react';

// Components
import {
  Button,
  RadioField,
  TextView
} from '@components';
import { AssignmentOptions } from '@components/Panel/AssignItems';

// Interfaces
import {
  Item,
  RoleRule,
  UserRole,
  UserRule
} from '@interfaces';

// Context
import { Context } from '@stores';

// Helpers
import {
  getRoleRulesForRole,
  getUserRolesForUser,
  getUserRulesForUser,
} from '@helpers';

export enum SingleOptionTypes {
  RolesAssigned = 'Roles assigned',
  RoleRulesAssigned = 'Rules assigned',
  MemberAssigned = 'Members assigned',
}

interface AssignHeaderProps {
  items: Item[];
  heading: string;
  optionName: string;
  isModifying: boolean;
  userRules?: UserRule[];
  userRoles?: UserRole[];
  roleRules?: RoleRule[];
  onModifyClick: () => void;
  selectedType: AssignmentOptions;
  singleOption?: SingleOptionTypes;
  onTypeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AssignHeader = ({
  items,
  optionName,
  heading,
  isModifying,
  userRules,
  userRoles,
  roleRules,
  onModifyClick,
  selectedType,
  singleOption,
  onTypeChange,
}: AssignHeaderProps) => {
  // Context
  const { state } = useContext(Context);
  const { selectedRow } = state;

  /**
   * The number of items that are directly assigned.
   */
  const directlyAssignedCount =
    items.filter((item) => item.isAssigned).length || 0;

  const userRulesForUser = getUserRulesForUser(userRules, selectedRow.data.id);
  const userRolesForUser = getUserRolesForUser(userRoles, selectedRow.data.id);

  // Create a Set to store unique 'ruleIds'
  const ruleIds = new Set();

  // Add all 'ruleId' from 'userRules' to Set
  userRulesForUser?.forEach((userRule) => ruleIds.add(userRule.ruleId));

  userRolesForUser?.forEach((userRole) => {
    // Tìm tất cả 'roleRules' cho mỗi 'roleId'
    const roleRulesForRole = getRoleRulesForRole(roleRules, userRole.roleId);

    // Add all 'ruleId' from 'roleRules' to Set
  roleRulesForRole?.forEach((roleRule) => ruleIds.add(roleRule.ruleId));
  });

  // The number 'allAssignments' is the number of unique elements in the Set
  let allAssignmentsCount = ruleIds.size;

  /**
   * Data for the radio fields or text view.
   */
  const data = singleOption
    ? [
        {
          id: singleOption.toLowerCase().replace(' ', '-'),
          name: optionName,
          value: singleOption,
          checked: false,
          actions: () => {},
          label: `${singleOption} (${directlyAssignedCount})`,
        },
      ]
    : [
        {
          id: 'assigned-directly',
          name: optionName,
          value: 'Assigned directly',
          checked: selectedType === 'Assigned directly',
          actions: () => {},
          label: `Assigned directly (${directlyAssignedCount})`,
        },
        {
          id: 'all-assignments',
          name: optionName,
          value: 'All assignments',
          checked: selectedType === 'All assignments',
          actions: () => {},
          label: `All assignments (${allAssignmentsCount})`,
        },
      ];

  /**
   * Determines whether to show the radio fields.
   */
  const showRadioFields = data.length > 1;

  /**
   * Determines whether to show the text view.
   */
  const showTextView = !showRadioFields && data[0];

  return (
    <div className="panel-assign__container">
      <section
        style={{ gap: `${showTextView ? '0' : '10px'}` }}
        className="panel-assign__section"
      >
        <h2 className="panel-assign__heading">{heading}</h2>

        {showRadioFields &&
          data.map((item) => (
            <RadioField
              key={item.id}
              id={item.id}
              name={item.name}
              label={item.label}
              value={item.value}
              checked={item.checked}
              actions={onTypeChange}
            />
          ))}

        {showTextView && (
          <TextView
            additionalClass="panel-assign__roles-count"
            value={`${data[0].value} (${directlyAssignedCount})`}
          />
        )}
      </section>

      <Button
        additionalClass="panel-assign__button"
        size="sm"
        variants="secondary"
        onClick={onModifyClick}
        disabled={selectedType === AssignmentOptions.AllAssignments}
      >
        {isModifying ? 'Done' : 'Modify'}
      </Button>
    </div>
  );
};

export default AssignHeader;
