import type { Meta, StoryObj } from '@storybook/react';
import SidebarItem from '.';

export default {
  title: 'Component/Sidebar/SidebarItem',
  component: SidebarItem,
} as Meta;

type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    children: '',
  },
};
