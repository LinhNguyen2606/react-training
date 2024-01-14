import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Panel } from '@components';
import EditorProfile from '@components/Panel/EditorProfile';

// Helper
import { generateRandomColor } from '@helpers';

export default {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description:
        "An array of tab objects. Each object have a 'title' property for the tab title and a 'content' property for the tab content.",
    },
    onBackClick: {
      description: 'The onClick event when you click on the arrow left helps to back',
    },
  },
} as Meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    tabs: [
      {
        title: 'General',
        content: (
          <EditorProfile
            id={1}
            bgColor={generateRandomColor()}
            dataItems={[
              {
                id: 1,
                type: 'TEXT_FIELD',
                label: 'Full Name',
                key: 'userName',
                value: 'Elly Soyer',
              },
              {
                id: 2,
                type: 'TEXT_FIELD',
                label: 'Email',
                key: 'email',
                value: 'elly.soyer@example',
              },
              {
                id: 3,
                type: 'AVATAR_FIELD',
                label: 'Avatar',
                key: 'avatar',
                value: '',
                keyImageDefault: 'userName',
              },
              {
                id: 4,
                type: 'STATUS_FIELD',
                label: 'Status',
                key: 'status',
                value: true,
              },
              {
                id: 5,
                type: 'DATE_FIELD',
                label: 'Registered',
                key: 'registered',
                value: 'January 12, 2024 10:15:34',
              },
              {
                id: 6,
                type: 'DATE_FIELD',
                label: 'Last visited',
                key: 'lastVisited',
                value: 'January 12, 2024 10:15:34',
              },
              {
                id: 7,
                type: 'DETAILS_FIELD',
                label: 'Details',
                key: 'details',
                value: 'Farmer',
              },
            ]}
            onRemove={() => {}}
            onSubmit={() => {}}
          />
        ),
      },
    ],
  },
};
