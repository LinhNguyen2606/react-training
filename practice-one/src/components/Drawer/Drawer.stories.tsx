import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Drawer } from '@components';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    width: {
      description: 'The width of drawer.',
      table: {
        defaultValue: { summary: '210px' },
      },
    },
    height: {
      description: 'The height of drawer.',
      table: {
        defaultValue: { summary: '500px' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Drawer>;

/** The drawer is a sidebar that appears on the left side. Inside the sidebar there are items for each specific action. */
export const Default: Story = {
  args: {
    width: 210,
    height: 500,
  },
};
