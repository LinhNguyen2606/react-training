// Component
import AssignItem, { Item } from '@components/Panel/AssignItems';

interface AssignRulesProps {
  rules: Item[];
  heading: string;
}

const AssignRules = ({ rules, heading }: AssignRulesProps) => {
  return (
    <AssignItem
      items={rules}
      heading={heading}
      optionName="rule"
    />
  )
};

export default AssignRules;
