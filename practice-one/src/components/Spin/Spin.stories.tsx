import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Spin } from '@components';

export default {
  title: 'Components/Spin',
  component: Spin,
  tags: ['autodocs'],
  argTypes: {
    isProcessing: {
      description: 'The process of the spin',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    delay: {
      description: 'The delay time of the spin',
      table: {
        defaultValue: { summary: 1000 },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Spin>;

export const Default: Story = {
  args: {
    isProcessing: true,
    delay: 1000,
  },
};
