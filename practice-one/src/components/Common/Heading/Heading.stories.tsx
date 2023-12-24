import type { Meta, StoryObj } from '@storybook/react';

// Components
import Heading from '.';

export default {
  title: 'Components/Heading',
  component: Heading,
} as Meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'User Management',
  },
};
