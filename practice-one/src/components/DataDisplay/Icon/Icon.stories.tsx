import type { Meta, StoryObj } from '@storybook/react';

// Component
import Icon from '.';

// Icon
import { Pencil } from '../../../assets/icons';


export default {
  title: 'Components/Icon',
  component: Icon,
} as Meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    src: Pencil,
  },
};
