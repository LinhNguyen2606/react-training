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
    size: {
      description: 'The size of the spin',
      table: {
        defaultValue: { summary: 20 },
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
    delay: 1000,
    size: 20,
    isProcessing: true,
  },
};
