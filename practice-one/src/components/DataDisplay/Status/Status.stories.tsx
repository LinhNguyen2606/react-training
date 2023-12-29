import type { Meta, StoryObj } from '@storybook/react';

// Component
import Status from '.';

export default {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      description: 'Shows whether the status is active or inactive',
      table: {
        defaultValue: { summary: true },
      },
    },
    active: {
      description: 'Short text to describe the status',
      table: {
        defaultValue: { summary: 'Active' },
      },
    },
    notActive: {
      description: 'Short text to describe the status',
      table: {
        defaultValue: { summary: 'Not active' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Status>;

/** Status is an expression of the user's status as being active or inactive. */
export const Default: Story = {
  args: {
    isActive: true,
    active: 'Active',
    notActive: 'Not active',
  },
};
