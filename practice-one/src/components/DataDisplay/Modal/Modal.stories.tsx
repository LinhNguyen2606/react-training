import type { Meta, StoryObj } from '@storybook/react';

// Component
import Modal from '@components/DataDisplay/Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: 'Actions to open or close the modal',
      table: {
        defaultValue: { summary: true },
      },
    },
    type: {
      description: 'The type of the modal is submit or confirm',
      table: {
        defaultValue: { summary: 'submit' },
      },
    },
    title: {
      description: 'The title of the modal header',
      table: {
        defaultValue: { summary: 'Enter user name' },
      },
    },
    textConfirmation: {
      description: 'The text of the confirm modal',
      table: {
        defaultValue: { summary: 'Are you sure to delete this user?' },
      },
    },
    onHide: {
      description: 'The onClick event when you click to close the modal',
    },
    onRemove: {
      description: 'The onClick event when you perform a remove action',
    },
    onChange: {
      description: 'The onChange event when you type in the input',
    },
    onSubmit: {
      description: 'The onClick event when you submit',
    },
  },
} as Meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    type: 'submit',
    title: 'Enter user name',
    textConfirmation: 'Are you sure to delete this user?',
  },
};
