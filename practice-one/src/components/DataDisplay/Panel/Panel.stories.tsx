import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Panel } from '@components/DataDisplay';
import EditorProfile from '@components/DataDisplay/Panel/EditorProfile';

// Helper
import { generateRandomColor } from '@helpers';

// Constant
import { DATA_ITEMS } from '@constants';

// Interface
import { DataItems } from '@interfaces';

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
            userName={''}
            email={''}
            details={''}
            dataItems={DATA_ITEMS as DataItems[]}
            avatar={''}
            isActive={true}
            bgColor={generateRandomColor()}
            onRemove={() => {}}
          />
        ),
      },
    ],
  },
};
