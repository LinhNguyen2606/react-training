import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Button } from '@components/Inputs';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    additionalClass: {
      description: 'Adds the additional class to the button.',
      table: {
        defaultValue: { summary: 'drawer' },
      },
    },
    children: {
      description: 'The element you want to add inside the button to display',
      table: {
        defaultValue: { summary: '+ New' },
      },
    },
    size: {
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    variants: {
      description: 'Button variations',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof Button>;

/** Button is used to interact with users */
export const Default: Story = {
  args: {
    variants: 'primary',
    children: '+ New',
    size: 'lg',
    additionalClass: 'drawer',
  },
};
