import type { Meta, StoryObj } from '@storybook/react';

// Component
import Card from '.';

// Helper
import { generateRandomColor } from '../../../helpers';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'User information',
    isActive: true,
    bgColor: generateRandomColor(),
    userName: 'Username',
    email: 'email@example.com',
    lastVisited: 'Dec 27, 2023 14:48:06',
  },
};
