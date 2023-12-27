import type { Meta, StoryObj } from '@storybook/react';

// Components
import Table from '.';
import Avatar from '../Avatar';
import Status from '../Status';

// Types
import { EnitityColumnType, User } from '../../../types/index';

// Helper
import { generateRandomColor } from '../../../helpers';

export default {
  title: 'Components/Table',
  component: Table,
} as Meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    rowData: [
      {
        id: 1,
        userName: 'Ned Stark',
        isActive: true,
        email: 'winterhell@gmail.com',
        avatar: '',
        bgColor: generateRandomColor(),
      },
      {
        id: 2,
        userName: 'Lord Varys',
        isActive: false,
        email: 'little.birds@gmail.com',
        avatar: '',
        bgColor: generateRandomColor(),
      },
    ],
    columns: [
      {
        key: 'avatar',
        title: '',
        render: (_, item: User) => (
          <Avatar src={item.avatar} alt={item.userName} bgColor={item.bgColor} additionalClass="avatar--circle" />
        ),
      },
      {
        key: 'userName',
        title: 'Full Name',
        width: "300px"
      },
      {
        key: 'isActive',
        title: 'Status',
        render: (_, item: User) => <Status isActive={item.isActive} />,
        width: "160px"
      },
      {
        key: 'email',
        title: 'Email',
        width: "300px"
      },
    ] as EnitityColumnType<unknown>[],
  },
};
