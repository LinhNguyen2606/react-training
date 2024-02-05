import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Status } from '@components';

export default {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'Shows whether the status is active or inactive',
      table: {
        defaultValue: { summary: true },
      },
    },
    checkedLabel: {
      description: 'Short text to describe the status',
      table: {
        defaultValue: { summary: 'Active' },
      },
    },
    unCheckedLabel: {
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
    checked: true,
    checkedLabel: 'Active',
    unCheckedLabel: 'Not active',
  },
};
