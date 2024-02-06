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
        type: 'AVATAR_LABEL_VIEW',
        src: '',
        alt: 'Linh Nguyen',
        desc: 'Can see user details and access levels',
        label: 'Daenerys Stormborn Targaryen',
        bgColor: generateRandomColor(),
      },
      {
        type: 'TEXT_VIEW',
        icon: Envelope,
        label: 'Email:',
        value: 'breaker.of.chains@gm.com',
      },
      {
        type: 'TEXT_VIEW',
        icon: Clock,
        label: 'Last visited:',
        value: dateFormat(new Date().toString()),
      },
      {
        type: 'LIST_VIEW',
        values: [
          {
            icon: Shield,
            label: 'Roles (3)',
            value: ['Admin', 'Manager', 'Reporting']
          },
          {
            icon: ListCheck,
            label: 'Rules (1)',
            value: ['Can see reports'],
          },
        ],
      },
    ] as SidebarProps['data'],
  },
};
