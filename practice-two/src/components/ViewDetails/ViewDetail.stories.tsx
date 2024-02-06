import type { Meta, StoryObj } from '@storybook/react';

// Components
import {
  ViewDetails,
  Status,
  Icons,
  Avatar
} from '@components';

// Helper
import { dateFormat, generateRandomColor } from '@helpers';

// Icons
import {
  Clock,
  Envelope,
  ListCheck,
  Shield,
  Pencil
} from '@assets/icons';

export default {
  title: 'Components/ViewDetails',
  component: ViewDetails,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of user details form',
      table: {
        defaultValue: { summary: 'User information' },
      },
    },
    header: {
      description: 'The header of the card view details',
    },
    children: {
      description: 'The element you want to add inside the view details',
    },
    infoItem: { description: 'Contains the label and value' },
  },
} as Meta;

type Story = StoryObj<typeof ViewDetails>;

export const Default: Story = {
  args: {
    title: 'User information',
    header: (
      <>
        <Status checked={false} />
        <div className="view-details__header--icon">
          <Icons src={Pencil} />
        </div>
      </>
    ),
    children: (
      <>
        <Avatar
          size="lg"
          src=""
          alt="Username"
          bgColor={generateRandomColor()}
        />
        <span className="view-details__username">Username</span>
      </>
    ),
    infoItem: [
      {
        icon: Envelope,
        label: 'Email:',
        value: <span className="view-details__info">user@example.com</span>,
      },
      {
        icon: Clock,
        label: 'Last visited:',
        value: (
          <span className="view-details__info">
            {dateFormat(new Date().toString())}
          </span>
        ),
      },
      {
        icon: Shield,
        label: 'Roles (3)',
        value: (
          <div className="view-details__permission">
            {['Admin', 'Team Lead', 'Reporting'].map((role, index) => (
              <span
                key={index}
                className="text--primary view-details__permission--label"
              >
                {role}
              </span>
            ))}
          </div>
        ),
      },
      {
        icon: ListCheck,
        label: 'Rules (2)',
        value: (
          <div className="view-details__permission">
            {[
              'Can modify user details and access levels',
              'Can create projects',
            ].map((rule, index) => (
              <label
                key={index}
                className="text--primary view-details__permission--label"
              >
                {rule}
              </label>
            ))}
          </div>
        ),
      },
    ],
  },
};
