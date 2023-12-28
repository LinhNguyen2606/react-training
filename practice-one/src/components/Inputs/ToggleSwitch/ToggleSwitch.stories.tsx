import type { Meta, StoryObj } from '@storybook/react';

// Component
import ToggleSwitch from '.';

export default {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
    isChecked: {
      description: 'The status of the toggle switch',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof ToggleSwitch>;

/** The toggle switch box to indicates the user's status */
export const Default: Story = {
  args: {
    isChecked: false,
  },
};
