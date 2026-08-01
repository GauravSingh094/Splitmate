import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Settled Up',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'You Owe $45.00',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Equal Split',
  },
};
