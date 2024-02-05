import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Toast } from '@components';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    status: {
      description: 'The status of the toast',
      table: {
        defaultValue: { summary: 'success' },
      },
    },
    size: {
      description: 'The size of the toast icon',
      table: {
        defaultValue: { summary: 20 },
      },
    },
    delay: {
      description: 'The delay time of the toast',
      table: {
        defaultValue: { summary: 2000 },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    delay: 2000,
    size: 20,
    status: 'success',
  },
};
