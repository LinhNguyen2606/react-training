import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Popover } from '@components';

export default {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'The content inside popover',
      table: {
        defaultValue: { summary: true },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    children: 'New',
    content: [
      { id: 1, text: 'Add new user' },
      { id: 2, text: 'Add new role' },
    ],
    placement: 'bottom',
  },
};
