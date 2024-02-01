import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Icon } from '@components';

// Icon
import { Pencil } from '@assets/icons';

export default {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'The icon source.',
      table: {
        defaultValue: { summary: 'Pencil icon' },
      },
    },
    width: {
      description: 'The width of icon.',
      table: {
        defaultValue: { summary: '20' },
      },
    },
    height: {
      description: 'The height of icon.',
      table: {
        defaultValue: { summary: '20' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Icon>;

/** Icons appear on this site.  */
export const Default: Story = {
  args: {
    src: Pencil,
  },
};
