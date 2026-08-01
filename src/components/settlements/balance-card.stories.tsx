import type { Meta, StoryObj } from '@storybook/react';

import { BalanceCard } from './balance-card';

const meta: Meta<typeof BalanceCard> = {
  title: 'Features/BalanceCard',
  component: BalanceCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

export const YouOwe: Story = {
  args: {
    userId: 'u-2',
    name: 'Bob Smith',
    amount: -45.5,
    currency: 'USD',
    onSettleUp: (userId: string, amount: number) => alert(`Settle Up for ${userId}: $${amount}`),
  },
};

export const OwedToYou: Story = {
  args: {
    userId: 'u-3',
    name: 'Charlie Brown',
    amount: 85.0,
    currency: 'USD',
    onSettleUp: (userId: string, amount: number) => alert(`Settle Up for ${userId}: $${amount}`),
  },
};
