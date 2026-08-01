import type { Meta, StoryObj } from '@storybook/react';

import { ExpenseCard } from './expense-card';

const meta: Meta<typeof ExpenseCard> = {
  title: 'Features/ExpenseCard',
  component: ExpenseCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExpenseCard>;

export const Default: Story = {
  args: {
    expense: {
      id: 'exp-1',
      group_id: 'grp-1',
      paid_by_user_id: 'u-1',
      paid_by_name: 'John Doe',
      title: 'Team Lunch at Bistro',
      total_amount: '120.00',
      currency: 'USD',
      split_type: 'EQUAL',
      status: 'active',
      created_at: '2026-07-30T12:00:00Z',
      participants: [],
    },
  },
};
