import type { Meta, StoryObj } from '@storybook/react';

// Component
import TextArea from '@components/Inputs/TextArea';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The value in the textarea',
    },
    placeholder: {
      description: 'The placeholder in the textarea',
    },
    onChange: {
      description: 'onChange event when you type the word in the textarea',
    },
  },
} as Meta;
type Story = StoryObj<typeof TextArea>;

/** Text Fields let users enter and edit text. */
export const Default: Story = {
  args: {
    placeholder: '',
  },
};
