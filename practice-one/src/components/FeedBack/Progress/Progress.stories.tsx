import type { Meta, StoryObj } from '@storybook/react';

// Component
import Progress from '@components/FeedBack/Progress';

export default {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    rowData: {
      successMessage: 'The message successfully',
      table: {
        defaultValue: { summary: 'Done' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    successMessage: 'Done'
  },
};
