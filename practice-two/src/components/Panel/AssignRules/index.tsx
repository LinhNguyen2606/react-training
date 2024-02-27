import { memo } from 'react';

// Component
import AssignItem from '@components/Panel/AssignItems';

// Interface
import { Item } from '@interfaces';

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

export default memo(AssignRules);
