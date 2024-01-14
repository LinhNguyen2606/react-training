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
    status: 'success',
    delay: 2000,
  },
};
