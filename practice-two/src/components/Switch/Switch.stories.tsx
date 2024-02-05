import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Switch } from '@components';

export default {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'The status of the switch',
      table: {
        defaultValue: { summary: false },
      },
    },
    onChange: {
      description: 'The onChange event of the switch',
    },
  },
} as Meta;
type Story = StoryObj<typeof Switch>;

/** The toggle switch box to indicates the user's status */
export const Default: Story = {
  args: {
    checked: false,
  },
};
