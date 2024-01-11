import type { Meta, StoryObj } from '@storybook/react';

// Component
import { UploadImage } from '@components';

// Helper
import { generateRandomColor } from '@helpers';

export default {
  title: 'Components/UploadImage',
  component: UploadImage,
  tags: ['autodocs'],
  argTypes: {
    originalImage: {
      description: 'The original of the avatar',
    },
    alt: {
      description: 'An image with an alternate text specified',
      table: {
        defaultValue: { summary: 'Username' },
      },
    },
    bgColor: { description: 'A randomly generated background color.' },
    label: {
      description: 'A label of the button',
      table: {
        defaultValue: { summary: 'Upload new photo' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof UploadImage>;

/** Image Uploader is the solution intended to make mass file upload easier. */
export const Default: Story = {
  args: {
    originalImage: '',
    alt: 'Username',
    bgColor: generateRandomColor(),
    label: 'Upload new photo',
  },
};
