import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Progress } from '@components';

export default {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    isProcessing: {
      description: 'The process of the spinner',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    delay: {
      description: 'The delay time of the spinner',
      table: {
        defaultValue: { summary: 1000 },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    isProcessing: true,
    delay: 1000,
  },
};
