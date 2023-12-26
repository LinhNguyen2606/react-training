import type { Meta, StoryObj } from '@storybook/react';

// Component
import Status from '.';

export default {
  title: 'Components/Status',
  component: Status,
} as Meta;

type Story = StoryObj<typeof Status>;

export const Default: Story = {
  args: {
    isActive: true,
    active: 'Active',
    notActive: 'Not active',
  },
};
