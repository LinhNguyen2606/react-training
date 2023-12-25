import type { Meta, StoryObj } from '@storybook/react';

// Component
import Drawer from '.';

export default {
  title: 'Components/Drawer',
  component: Drawer,
} as Meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    width: 210,
    height: 500,
  },
};
