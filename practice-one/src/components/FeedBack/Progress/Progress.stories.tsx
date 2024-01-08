import type { Meta, StoryObj } from '@storybook/react';

// Component
import Progress from '@components/FeedBack/Progress';

export default {
  title: 'Components/Progress',
  component: Progress,
} as Meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    successMessage: 'Done'
  },
};
