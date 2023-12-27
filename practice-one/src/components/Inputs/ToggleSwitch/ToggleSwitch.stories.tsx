import type { Meta, StoryObj } from '@storybook/react';

// Component
import ToggleSwitch from '.';

export default {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch
} as Meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
  args: {
    isChecked: false
  }
};