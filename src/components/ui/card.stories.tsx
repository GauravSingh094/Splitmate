import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['surface', 'raised', 'interactive', 'outlined', 'inset'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Surface: Story = {
  args: {
    variant: 'surface',
    className: 'p-6',
    children: <p className="text-sm">Standard Neo-Clay surface container.</p>,
  },
};

export const Raised: Story = {
  args: {
    variant: 'raised',
    className: 'p-6',
    children: <p className="text-sm font-semibold">Elevated Neo-Clay card surface.</p>,
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    className: 'p-6',
    children: <p className="text-sm font-semibold">Hover-responsive interactive card.</p>,
  },
};
