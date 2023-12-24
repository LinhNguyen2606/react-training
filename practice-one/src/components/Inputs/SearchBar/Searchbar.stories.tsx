import type { Meta, StoryObj } from '@storybook/react';

// Components
import SearchBar from '.';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
} as Meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    label: 'Users',
    placeholder: 'Search',
  },
};
