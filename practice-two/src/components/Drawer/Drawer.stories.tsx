import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Drawer, Icons } from '@components';

// Icon
import { UserGroup } from '@assets/icons';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: 'The position of drawer.',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Drawer>;

/** The drawer is a sidebar that appears on the left side. Inside the sidebar there are items for each specific action. */
export const Default: Story = {
  args: {
    navigations: [
      {
        id: 1,
        label: 'Users',
        action: () => {},
        path: '/',
        icon: <Icons src={UserGroup} size="20" />,
      },
    ],
  },
};
