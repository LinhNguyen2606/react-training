import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Avatar } from '@components';

// Helper
import { generateRandomColor } from '@helpers';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { description: 'The image source.' },
    alt: { description: 'An image with an alternate text specified.' },
    size: {
      description: 'The size of the avatar.',
      table: {
        defaultValue: { summary: 'sm' },
      },
    },
    bgColor: { description: 'A randomly generated background color.' },
  },
} as Meta;

type Story = StoryObj<typeof Avatar>;

/** Avatars are personal images of users. */
export const Default: Story = {
  args: {
    alt: 'UserName',
    bgColor: generateRandomColor(),
  },
};
