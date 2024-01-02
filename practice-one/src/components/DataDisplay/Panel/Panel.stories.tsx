import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Panel } from '@components/DataDisplay';
import ProfileForm from '@components/DataDisplay/Panel/ProfileForm';

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
  },
} as Meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    tabs: [
      {
        title: 'General',
        content: (
          <ProfileForm
            id={1}
            avatar={''}
            userName={'Username'}
            email={''}
            isActive={true}
            registered={undefined}
            lastVisited={undefined}
            details={''}
            bgColor={generateRandomColor()}
            onRemove={() => {}}
          />
        ),
      },
    ],
  },
};
