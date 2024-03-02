import type { Meta, StoryObj } from '@storybook/react';

// Component
import { ColorField } from '@components';

export default {
  title: 'Components/ColorField',
  component: ColorField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label of Color Field',
      table: {
        defaultValue: { summary: 'Color' },
      },
    },
    bgColor: {
      description: 'The color of the color field',
      table: {
        defaultValue: { summary: '#000' },
      },
    },
    onChange: {
      description: 'onChange event when you select a color',
    },
  },
} as Meta;
type Story = StoryObj<typeof ColorField>;

/** Text Fields let users enter and edit text. */
export const Default: Story = {
  args: {
    label: 'Color',
    bgColor: '#000000',
  },
};
