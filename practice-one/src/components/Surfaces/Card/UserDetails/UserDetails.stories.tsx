import type { Meta, StoryObj } from '@storybook/react';

// Component
import UserDetails from '.';
import { USER_INFORMATION  } from '../../../../constants/UserInformation';

// Helper
import { generateRandomColor } from '../../../../helpers/index';

export default {
  title: 'Components/UserDetails',
  component: UserDetails,
} as Meta;

type Story = StoryObj<typeof UserDetails>;

export const Default: Story = {
  args: {
    title: 'User information',
    isActive: true,
    bgColor: generateRandomColor(),
    userName: 'Username',
    infoItem: USER_INFORMATION ,
  },
};
