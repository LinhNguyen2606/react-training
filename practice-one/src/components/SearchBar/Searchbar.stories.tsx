import type { Meta, StoryObj } from '@storybook/react';

// Component
import { SearchBar } from '@components';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label of the search bar',
      table: {
        defaultValue: { summary: 'Users' },
      },
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
type Story = StoryObj<typeof SearchBar>;

/** Search bar is a search toolbar that helps find users quickly and easily.  */ 
export const Default: Story = {
  args: {
    label: 'Users',
    placeholder: 'Search',
  },
};
