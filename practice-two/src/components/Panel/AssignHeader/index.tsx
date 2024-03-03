import { ChangeEvent } from 'react';

// Components
import {
  Button,
  RadioField,
  TextView
} from '@components';
import { AssignmentOptions } from '@components/Panel/AssignItems';

// Interface
import { Item } from '@interfaces';

export enum SingleOptionTypes {
  RolesAssigned = 'Roles assigned',
  RoleRulesAssigned = 'Rules assigned'
}

interface AssignHeaderProps {
  items: Item[];
  heading: string;
  optionName: string;
  isModifying: boolean;
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
  onModifyClick,
  selectedType,
  singleOption,
  onTypeChange,
}: AssignHeaderProps) => {
  /**
   * The number of items that are directly assigned.
   */
  const directlyAssignedCount =
    items.filter((item) => item.isAssigned).length || 0;

  /**
   * The total number of assignments.
   */
  const allAssignmentsCount = items.length || 0;

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
