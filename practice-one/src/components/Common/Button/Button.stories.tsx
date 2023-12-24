import type { Meta, StoryObj } from '@storybook/react';

// Components
import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variants: 'primary',
    children: '+ New',
    size: 'lg',
    className: 'sidebar',
  },
};
