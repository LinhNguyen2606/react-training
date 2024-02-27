import { memo } from 'react';

// Components
import AssignItem from '@components/Panel/AssignItems';
import { SingleOptionTypes } from '@components/Panel/AssignHeader';

// Interfaces
import { Item } from '@interfaces';

interface AssignRolesProps {
  roles: Item[];
  heading: string;
}

const AssignRoles = ({ roles, heading }: AssignRolesProps) => {
  return (
    <AssignItem
      items={roles}
      heading={heading}
      singleOption={SingleOptionTypes.RolesAssigned}
      optionName="role"
    />
  );
};

export default memo(AssignRoles);
