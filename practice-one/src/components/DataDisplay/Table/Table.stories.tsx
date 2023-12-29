import type { Meta, StoryObj } from '@storybook/react';

// Components
import Table from '@components/DataDisplay/Table';
import Avatar from '@components/DataDisplay/Avatar';
import Status from '@components/DataDisplay/Status';

// Types
import { EnitityColumnType, UserType } from '@types';

// Helper
import { generateRandomColor } from '@helpers';

export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    rowData: {
      description: 'The data to be displayed in the table rows.',
    },
    columns: {
      description:
        'Describe the structure and display of the columns in the table. Each column is defined by an object with properties such as key (a unique key to identify the column), title (the display title of the column), render (a custom function to display the data), and width ( column width).',
    },
    additionalClass: {
      description: 'The additional class name you want to add',
    },
    onRowClick: {
      description: 'The handle click function when you click the table row cell',
    },
  },
} as Meta;

type Story = StoryObj<typeof Table>;

/**Table is a component used to display a set of data in the form of rows and columns. */
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
        render: (_, item: UserType) => (
          <Avatar
            src={item.avatar}
            alt={item.userName}
            bgColor={item.bgColor}
            additionalClass="avatar--circle" />
        ),
      },
      {
        key: 'userName',
        title: 'Full Name',
        width: '300px',
      },
      {
        key: 'isActive',
        title: 'Status',
        render: (_, item: UserType) => <Status isActive={item.isActive} />,
        width: '160px',
      },
      {
        key: 'email',
        title: 'Email',
        width: '300px',
      },
    ] as EnitityColumnType<unknown>[],
  },
};
