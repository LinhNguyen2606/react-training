import type { Meta, StoryObj } from '@storybook/react';

// Component
import Avatar from '.';

// Helper
import { generateRandomColor } from '../../../helpers/generate';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: 'UserName',
    bgColor: generateRandomColor(),
    additionalClass: 'avatar--circle',
  },
};
