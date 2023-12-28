import type { Meta, StoryObj } from '@storybook/react';

// Component
import TextField from '.';

export default {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The value you searched inside the input box',
    },
    placeholder: {
      description: 'Search bar input placeholder',
      table: {
        defaultValue: { summary: 'Search' },
      },
    },
    onChange: {
      description: 'onChange event when you type the keyword in the input',
    },
  },
} as Meta;
type Story = StoryObj<typeof TextField>;

/** Text Fields let users enter and edit text. */
export const Default: Story = {
  args: {
    placeholder: 'Search',
  },
};
