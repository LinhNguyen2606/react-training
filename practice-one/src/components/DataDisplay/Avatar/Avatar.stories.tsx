import type { Meta, StoryObj } from '@storybook/react';

// Component
import Avatar from '.';

// Helper
import { generateRandomColor } from '@helpers';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { description: 'The image source.' },
    alt: { description: 'An image with an alternate text specified.' },
    bgColor: { description: 'A randomly generated background color.' },
    additionalClass: {
      description: 'Adds the additional class to the avatar.',
      table: {
        defaultValue: { summary: 'avatar--circle' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Avatar>;

/** Avatars are personal images of users. */
export const Default: Story = {
  args: {
    alt: 'UserName',
    bgColor: generateRandomColor(),
    additionalClass: 'avatar--circle',
  },
};
