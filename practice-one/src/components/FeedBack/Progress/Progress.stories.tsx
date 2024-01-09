import type { Meta, StoryObj } from '@storybook/react';

// Component
import Progress from '@components/FeedBack/Progress';

export default {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    status: {
      description: 'The status of the spinner and the toast',
      table: {
        defaultValue: { summary: 'idle' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    status: 'idle'
  },
};
