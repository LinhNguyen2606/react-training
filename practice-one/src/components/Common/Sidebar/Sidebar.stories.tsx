import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '.';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    width: 210,
    height: 500,
  },
};
