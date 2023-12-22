import type { Meta, StoryObj } from '@storybook/react';
import Heading from '.';

export default {
  title: 'Component/Heading',
  component: Heading,
} as Meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'User Management',
  },
};
