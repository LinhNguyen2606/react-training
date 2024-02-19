import type { Meta, StoryObj } from '@storybook/react';

// Components
import { RadioField } from '@components';

export default {
  title: 'Components/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'The id of the radio field',
      table: {
        defaultValue: { summary: 'assigned-directly' },
      },
    },
    name: {
      description: 'The name of the radio field',
      table: {
        defaultValue: { summary: 'rule' },
      },
    },
    value: {
      description: 'The value of the radio field',
      table: {
        defaultValue: { summary: 'Assigned directly' },
      },
    },
    checked: {
      description: 'The status of the radio field is check or not',
      table: {
        defaultValue: { summary: true },
      },
    },
    actions: {
      description: 'The action to do for the radio field',
    },
    label: {
      description: 'The label of the radio field',
      table: {
        defaultValue: { summary: 'Assigned directly (2)' },
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof RadioField>;

export const Default: Story = {
  args: {
    id: 'assigned-directly',
    name: 'rule',
    value: 'Assigned directly',
    checked: true,
    actions: () => {},
    label: 'Assigned directly (2)',
  },
};
