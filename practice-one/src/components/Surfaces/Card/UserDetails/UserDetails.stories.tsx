import type { Meta, StoryObj } from '@storybook/react';

// Component
import UserDetails from '@components/Surfaces/Card/UserDetails';

// Helper
import { dateFormat, generateRandomColor } from '@helpers';

// Icons
import { Clock, Envelope } from '@assets/icons';

export default {
  title: 'Components/UserDetails',
  component: UserDetails,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of user details form',
      table: {
        defaultValue: { summary: 'User information' },
      },
    },
    isActive: {
      description: 'The status of the user',
      table: {
        defaultValue: { summary: true },
      },
    },
    src: { description: 'The image source.' },
    bgColor: { description: 'A randomly generated background color.' },
    userName: { description: 'A fullname of user' },
    infoItem: { description: 'Contains the label and value of the user such as: email, last visited' },
  },
} as Meta;

type Story = StoryObj<typeof UserDetails>;

export const Default: Story = {
  args: {
    title: 'User information',
    isActive: true,
    bgColor: generateRandomColor(),
    userName: 'Username',
    infoItem: [
      {
        icon: Envelope,
        label: 'Email:',
        value: 'user@example.com'
      },
      {
        icon: Clock,
        label: 'Last visited:',
        value: dateFormat(new Date().toString())
      }
    ]
  },
};
