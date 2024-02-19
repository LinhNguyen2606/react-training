import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Sidebar } from '@components';
import { SidebarProps } from '@components/Sidebar/SidebarInfo';

// Helpers
import { dateFormat, generateRandomColor } from '@helpers';

// Icons
import {
  Clock,
  Envelope,
  ListCheck,
  Shield
} from '@assets/icons';

// Constant
import { TYPES } from '@constants';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of the sidebar',
      table: {
        defaultValue: { summary: 'User information' },
      },
    },
    isActive: {
      description: 'The status of the user',
    },
    data: {
      description: 'The data to render the sidebar information',
    },
    onShowPanel: { description: 'The event action to show the panel' },
  },
} as Meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    title: 'User information',
    isActive: true,
    data: [
      {
        type: TYPES.AVATAR_LABEL_VIEW,
        src: '',
        alt: 'User',
        desc: 'Can see user details and access levels',
        label: 'Daenerys Stormborn Targaryen',
        bgColor: generateRandomColor(),
      },
      {
        type: TYPES.TEXT_VIEW,
        icon: Envelope,
        label: 'Email:',
        value: 'breaker.of.chains@gm.com',
      },
      {
        type: TYPES.TEXT_VIEW,
        icon: Clock,
        label: 'Last visited:',
        value: dateFormat(new Date().toString()),
      },
      {
        type: TYPES.LIST_VIEW,
        values: [
          {
            icon: Shield,
            label: 'Roles (3)',
            values: [
              { text: 'Admin', link: '/' },
              { text: 'Manager', link: '/' },
              { text: 'Reporting', link: '/' },
            ],
          },
          {
            icon: ListCheck,
            label: 'Rules (1)',
            values: [{ text: 'Can see reports', link: '/' }],
          },
        ],
      },
    ] as SidebarProps['data'],
  },
};
