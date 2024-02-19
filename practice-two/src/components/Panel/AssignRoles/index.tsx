// Components
import AssignItem, { Item } from '@components/Panel/AssignItems';
import { SingleOptionTypes } from '@components/Panel/AssignHeader';

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

export default AssignRoles;
