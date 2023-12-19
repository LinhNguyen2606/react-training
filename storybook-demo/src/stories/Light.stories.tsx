import type { Meta, StoryObj } from '@storybook/react';

import Light from './Light';

const meta: Meta<typeof Light> = {
    component: Light,
    tags: ['autodocs'],
    title: 'Light/Example',
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['green', 'yellow', 'red'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

/** This is how it looks by default */
export const Base: Story = {
    args: {
        variant: 'green',
    },
};

/** Whatever!!*/
export const Yellow: Story = {
    args: {
        variant: 'yellow',
    },
};

export const Red: Story = {
    args: {
        variant: 'red',
    },
};

export const Another: Story = {
    render: () => (
        <div
            style={{
                background: 'gray',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                border: '1px solid #000',
                width: 'max-content',
                padding: 10,
            }}
        >
            <Light variant="red" />
            <Light variant="yellow" />
            <Light variant="green" />
        </div>
    ),
};
