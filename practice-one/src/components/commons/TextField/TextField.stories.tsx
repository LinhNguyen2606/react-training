import type { Meta, StoryObj } from '@storybook/react';

// Components
import TextField from '.';

export default {
  title: 'Components/TextField',
  component: TextField,
} as Meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    placeholder: 'Search',
  },
};
